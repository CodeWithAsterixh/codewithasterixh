/*
queries/heroQuery.ts
*/
export const HERO_QUERY = `*[_type == "hero"][0]{
title,
subtitle,
intro,
avatar{asset->{_id, url}},
badges,
primaryCta,
secondaryCta
}`;

/*
queries/servicesQuery.ts
*/
export const SERVICES_QUERY = `*[_type == "servicesSection"][0]{
heading,
subheading,
"items": items[]{index, title, description, "icon": icon.asset->{_id, url}}
}`;

/*
queries/aboutQuery.ts
*/
export const ABOUT_QUERY = `*[_type == "aboutSection"][0]{
heading,
bio,
"portrait": portrait.asset->{_id, url},
"stats": stats[]{label, value}
}`;

/*
queries/techQuery.ts
*/
export const TECH_QUERY = `*[_type == "technologiesSection"][0]{
heading,
"items": items[]{name, "icon": icon.asset->{_id, url}, proficiency}
}`;

/*
queries/educationWorkQuery.ts
*/
export const EDUCATION_WORK_QUERY = `*[_type == "educationWorkSection"][0]{
}`;
