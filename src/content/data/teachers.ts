export interface Teacher {
  id: string
  name: string
  role: string
  bio: string
  image: string
  credentials: string[]
  interests: string[]
}

export const teachers: Teacher[] = [
  {
    id: 'carolyn',
    name: 'Carolyn Pugh',
    role: 'Lead Teacher',
    bio: 'Carolyn enjoys nurturing preschool children with songs, stories, art, nature, and plenty of time for imaginative play. Her three daughters are all MBPS alumni, and she loves the unique cooperative model of the school and the community it provides. In 2019, Carolyn became the lead teacher at MBPS following seven cumulative years as a parent and assistant teacher. She has a bachelor\'s and master\'s degree in history and completed her Waldorf Early Childhood teacher training through Sound Circle Center. Outside of teaching, she enjoys family time, yoga, board games, birding, cooking, and sewing.',
    image: '/images/teachers/carolyn.jpg',
    credentials: ['Bachelor\'s and Master\'s in History', 'Waldorf Early Childhood Training - Sound Circle Center'],
    interests: ['Family time', 'Yoga', 'Board games', 'Birding', 'Cooking', 'Sewing']
  },
  {
    id: 'alyssa',
    name: 'Alyssa',
    role: 'Teacher',
    bio: 'Alyssa brings warmth and creativity to our classroom community. [Bio to be provided]',
    image: '/images/teachers/alyssa.jpg',
    credentials: ['[Credentials to be provided]'],
    interests: ['[Interests to be provided]']
  }
]
