import {defineCliConfig} from 'sanity/cli'
import env from './env'

export default defineCliConfig({
  api: {
    projectId: env.PID,
    dataset: env.DATASET
  },
  autoUpdates: true,
})
