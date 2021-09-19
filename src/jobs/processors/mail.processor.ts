import { DoneCallback, Job } from 'bull';

export default function (job: Job, cb: DoneCallback) {
  console.log(`[${process.pid}]`);

  console.log(job.data);

  cb(null, null);
}
