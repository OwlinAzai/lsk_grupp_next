import type { NextApiRequest, NextApiResponse } from 'next'
 
type ResponseData = {
  temporaryURL: string
}
 
export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
    if (req.method === 'POST') {
        console.log(req.body);
      } else {
        // Handle any other HTTP method
      }
}