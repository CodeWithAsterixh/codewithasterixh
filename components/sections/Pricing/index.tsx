"use client"
import React, { useEffect, useState } from "react"
import { Heading, Headline } from "d/components/SmallItems/headings"
import { Button2 } from "d/components/ui/button2"
import { CheckCircle2, Zap } from "lucide-react"
import { PricingSection, Plan } from "d/cms-studio/types"
import { useGeolocated } from "react-geolocated"
import exchangeRate from "d/lib/static_ex_rate.json"

const EXCHANGE_RATE_KEY = "exchangeRates"
const EXCHANGE_RATE_TIMESTAMP_KEY = "exchangeRatesTimestamp"
const ONE_WEEK_MS = 7 * 24 * 60 * 60 * 1000

export default function Pricing({ data }: { data: PricingSection }) {
  const { coords } = useGeolocated({
    positionOptions: { enableHighAccuracy: false },
    userDecisionTimeout: 5000,
  })

  // ------------------------
  // State
  // ------------------------
  const [countryCode, setCountryCode] = useState<string | null>(null) // For discounts
  const [currencyCode, setCurrencyCode] = useState<string | null>(null) // For conversion
  const [currencySymbol, setCurrencySymbol] = useState<string>("$")
  const [exchangeRates, setExchangeRates] = useState<Record<string, number> | null>(null)
  const [priceReady, setPriceReady] = useState(false)

  // ------------------------
  // Helpers
  // ------------------------
  const formatUSD = (value: number) => `$${Math.round(value)}`

  const formatCompact = (value: number) => {
    if (value >= 1_000_000) return `${Math.round(value / 1_000_000)}m`
    if (value >= 1_000) return `${Math.round(value / 1_000)}k`
    return `${value}`
  }

  const formatWithRate = (value: number) => {
    if (!currencyCode || !exchangeRates) return formatUSD(value)
    const rate = exchangeRates[currencyCode]
    if (!rate) return formatUSD(value)
    return `${currencySymbol} ${formatCompact(Math.round(value * rate))}`
  }

  const getDiscountPercent = (plan: Plan) => {
    if (!currencyCode || !plan.country_discounts) return null
    const match = plan.country_discounts.find(
      d => d.countryCode.toUpperCase() === currencyCode.toUpperCase()
    )
    return match ? match.discountedPercent : null
  }

  const applyDiscount = (value: number, percent: number | null) => {
    if (!percent) return value
    return value * (1 - percent / 100)
  }

  const parsePrice = (priceStr: string) => Number(priceStr.replace("$", "").trim())

  const getAdjustedPrice = (plan: Plan) => {
    const clean = plan.price.replace(/\s+/g, " ").trim()
    const discount = getDiscountPercent(plan)

    const process = (val: number) => formatWithRate(applyDiscount(val, discount))

    if (clean.includes("to")) {
      const [min, max] = clean.split("to").map(parsePrice)
      return `${process(min)} to ${process(max)}`
    }

    if (clean.includes("-")) {
      const [min, max] = clean.split("-").map(parsePrice)
      return `${process(min)} - ${process(max)}`
    }

    return process(parsePrice(clean))
  }



  // ------------------------
  // Effects
  // ------------------------

  // Get country & currency
  useEffect(() => {
    if (!coords) return

    const fetchCountryCurrency = async () => {
      const { latitude, longitude } = coords
      try {
        const res = await fetch(
          `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
        )
        const data = await res.json()
        const country = data.address.country_code?.toUpperCase() || null
        setCountryCode(country)

        if (country) {
          try {
            const res2 = await fetch(`https://restcountries.com/v3.1/alpha/${country}`)
            const countryData = await res2.json()
            const curCode = Object.keys(countryData[0].currencies)[0]
            setCurrencyCode(curCode)
            setCurrencySymbol(countryData[0].currencies[curCode].symbol)
          } catch {
            setCurrencyCode("USD")
            setCurrencySymbol("$")
          }
        }
      } catch (err) {
        setCountryCode(null)
        setCurrencyCode("USD")
        setCurrencySymbol("$")
        console.error("Failed to fetch country/currency", err)
      }
    }

    fetchCountryCurrency()
  }, [coords])

  // Fetch exchange rates
  useEffect(() => {
    const fetchRates = async () => {
      const now = Date.now()
      const cachedRates = localStorage.getItem(EXCHANGE_RATE_KEY)
      const cachedTimestamp = Number(localStorage.getItem(EXCHANGE_RATE_TIMESTAMP_KEY) || "0")

      if (cachedRates && cachedTimestamp && now - cachedTimestamp < ONE_WEEK_MS) {
        setExchangeRates(JSON.parse(cachedRates))
        return
      }

      const updateRates = (rates: Record<string, number>) => {
        setExchangeRates(rates)
        localStorage.setItem(EXCHANGE_RATE_KEY, JSON.stringify(rates))
        localStorage.setItem(EXCHANGE_RATE_TIMESTAMP_KEY, String(now))
      }

      try {
        const res = await fetch(
          `https://v6.exchangerate-api.com/v6/${process.env.NEXT_PUBLIC_EXCHANGE_RATE_API_KEY}/latest/USD`
        )
        if (!res.ok) throw new Error("Failed to fetch exchange rates")
        const data = await res.json()
        updateRates(data.conversion_rates)
      } catch (err) {
        console.warn("Using static exchange rates fallback", err)
        updateRates(exchangeRate.conversion_rates)
      }
    }

    fetchRates()
  }, [])

  // Ready state
  useEffect(() => {
    if (currencyCode && exchangeRates) setPriceReady(true)
  }, [currencyCode, exchangeRates])

  // ------------------------
  // Render
  // ------------------------
  return (
    <section id="pricing" className="w-full bg-base-100 py-20">
      <main className="section_container px-4 flex flex-col items-center gap-12">
        <div className="text-center">
          <Headline className="font-normal text-2xl w-fit mx-auto">{data.headline}</Headline>
          <Heading
            texts={data.heading}
            className="w-fit text-3xl sm:text-4xl mx-auto"
            cowlick={{ className: "scale-75 -right-7 top-1" }}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
          {data.plans.map((plan, idx) => (
            <PlanCard
              key={idx}
              plan={plan}
              priceReady={priceReady}
              getAdjustedPrice={getAdjustedPrice}
            />
          ))}
        </div>
      </main>
    </section>
  )
}

// ------------------------
// PlanCard Component
// ------------------------
interface PlanCardProps {
  plan: Plan
  priceReady: boolean
  getAdjustedPrice: (plan: Plan) => string
}

function PlanCard({ plan, priceReady, getAdjustedPrice }: PlanCardProps) {
  return (
    <article
      className={`relative flex flex-col justify-between rounded-2xl border p-8 shadow-lg transition-all duration-300 ${
        plan.highlight
          ? "bg-primary/50 text-base-300 border-primary-content scale-105"
          : "bg-base-200 text-accent-content border-base-300"
      }`}
    >
      {plan.highlight && (
        <span className="absolute top-4 right-4 bg-base-300 text-primary text-xs font-semibold px-3 py-1 rounded-full flex items-center gap-1">
          <Zap className="size-4" /> Recommended
        </span>
      )}

      <header className="mb-6 text-center">
        <h3 className="text-xl font-bitcount font-bold mb-2">{plan.name}</h3>
        {!priceReady ? (
          <div className="w-32 h-7 rounded bg-base-300 animate-pulse mx-auto mb-1" />
        ) : (
          <p className="text-2xl font-extrabold">
            {getAdjustedPrice(plan)}
            <br />
            <span className="text-sm font-normal ml-1">{plan.duration}</span>
          </p>
        )}
      </header>

      <ul className="flex-1 space-y-3 mb-6">
        {plan.features.map((feature, i) => (
          <li key={i} className="flex items-center gap-3">
            <CheckCircle2 className={`size-5 ${plan.highlight ? "text-base-300" : "text-primary"}`} />
            <span className="text-sm">{feature}</span>
          </li>
        ))}
      </ul>

      <Button2
        variant={plan.highlight ? "secondary" : "default"}
        className={`w-full justify-center py-3 font-semibold ${
          plan.highlight ? "!bg-base-300 !text-primary hover:opacity-90" : "!bg-primary !text-base-300"
        }`}
        as="a"
        href={`#contact?pricingType=${plan.name.toLowerCase()}`}
      >
        Choose Plan
      </Button2>
    </article>
  )
}
