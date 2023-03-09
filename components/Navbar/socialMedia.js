import Git from 'assets/svg/github-svgrepo-com.svg'
import Instagram from 'assets/svg/instagram.svg'
import Linkedin from 'assets/svg/linkedin-svgrepo-com.svg'
import Dev from 'assets/svg/devto.svg'
import { DevToURL, GitHubURL, InstagramURL, LinkedInURL } from 'utils/constants'

export const socialMediaHandles = [
  {
    title: 'Github',
    url: GitHubURL,
    icon: <Git className='h-7 w-7' />,
  },
  {
    title: 'Instagram',
    url: InstagramURL,
    icon: <Instagram className='h-7 w-7' />,
  },
  {
    title: 'Linkedin',
    url: LinkedInURL,
    icon: <Linkedin className='h-7 w-7' />,
  },
  {
    title: 'Dev.to',
    url: DevToURL,
    icon: <Dev className='h-7 w-7' />,
  },
]
