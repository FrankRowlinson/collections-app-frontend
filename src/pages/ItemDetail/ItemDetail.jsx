import React from 'react'

import { Container, Grid, Paper } from '@mui/material'
import Image from 'mui-image'

import Details from '../../components/Details'
import CommentSection from '../../components/CommentSection'

const details = [
  {
    label: 'Description',
    content:
      'Prncus eniedpis. Integer pharetra eros nec dui rhoncus eleifend. Aenean a est quis nisi facilisis mattis vel sit amet felis.',
  },
  {
    label: 'Year',
    content: 1999,
  },
  {
    label: 'Country',
    content: 'Scotland',
  },
  {
    label: 'Details',
    content:
      'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ullam, possimus. Eligendi dicta sapiente possimus, iure incidunt mollitia esse distinctio nam corrupti. Veritatis quam corrupti consectetur, saepe sequi voluptatibus culpa expedita!',
  },
  {
    label: 'More details',
    content:
      'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ullam, possimus. Eligendi dicta sapiente possimus, iure incidunt mollitia esse distinctio nam corrupti. Veritatis quam corrupti consectetur, saepe sequi voluptatibus culpa expedita!',
  },
  {
    label: 'Even More details',
    content:
      'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ullam, possimus. Eligendi dicta sapiente possimus, iure incidunt mollitia esse distinctio nam corrupti. Veritatis quam corrupti consectetur, saepe sequi voluptatibus culpa expedita!',
  },
  {
    label: 'Even More details',
    content:
      'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ullam, possimus. Eligendi dicta sapiente possimus, iure incidunt mollitia esse distinctio nam corrupti. Veritatis quam corrupti consectetur, saepe sequi voluptatibus culpa expedita!',
  },
  {
    label: 'Even More details',
    content:
      'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ullam, possimus. Eligendi dicta sapiente possimus, iure incidunt mollitia esse distinctio nam corrupti. Veritatis quam corrupti consectetur, saepe sequi voluptatibus culpa expedita!',
  },
  {
    label: 'Even More details',
    content:
      'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ullam, possimus. Eligendi dicta sapiente possimus, iure incidunt mollitia esse distinctio nam corrupti. Veritatis quam corrupti consectetur, saepe sequi voluptatibus culpa expedita!',
  },
  {
    label: 'Even More details',
    content:
      'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ullam, possimus. Eligendi dicta sapiente possimus, iure incidunt mollitia esse distinctio nam corrupti. Veritatis quam corrupti consectetur, saepe sequi voluptatibus culpa expedita!',
  },
  {
    label: 'Even More details',
    content:
      'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ullam, possimus. Eligendi dicta sapiente possimus, iure incidunt mollitia esse distinctio nam corrupti. Veritatis quam corrupti consectetur, saepe sequi voluptatibus culpa expedita!',
  },
  {
    label: 'Even More details',
    content:
      'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ullam, possimus. Eligendi dicta sapiente possimus, iure incidunt mollitia esse distinctio nam corrupti. Veritatis quam corrupti consectetur, saepe sequi voluptatibus culpa expedita!',
  },
  {
    label: 'Even More details',
    content:
      'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ullam, possimus. Eligendi dicta sapiente possimus, iure incidunt mollitia esse distinctio nam corrupti. Veritatis quam corrupti consectetur, saepe sequi voluptatibus culpa expedita!',
  },
  {
    label: 'Even More details',
    content:
      'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ullam, possimus. Eligendi dicta sapiente possimus, iure incidunt mollitia esse distinctio nam corrupti. Veritatis quam corrupti consectetur, saepe sequi voluptatibus culpa expedita!',
  },
  {
    label: 'Even More details',
    content:
      'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ullam, possimus. Eligendi dicta sapiente possimus, iure incidunt mollitia esse distinctio nam corrupti. Veritatis quam corrupti consectetur, saepe sequi voluptatibus culpa expedita!',
  },
]

const comments = [
  { author: 'Jerry', text: 'Good stuff', createdAt: Date.now() },
  { author: 'Adam', text: 'Good stuff', createdAt: Date.now() },
  { author: 'Clinton', text: 'Good stuff', createdAt: Date.now() },
  { author: 'Vasya', text: 'Good stuff', createdAt: Date.now() },
  { author: 'Arthur', text: 'Good stuff', createdAt: Date.now() },
  { author: 'Gregory', text: 'Good stuff', createdAt: Date.now() },
  { author: 'Helen', text: 'Good stuff', createdAt: Date.now() },
]

function ItemDetail() {
  return (
    <Container sx={{mt: "20px"}}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={5}>
          <Paper sx={{position: 'sticky', top: 20}}>
            <Image
              src="https://picsum.photos/400/600"
              duration={1000}
              easing="cubic-bezier(0.7, 0, 0.6, 1)"
              showLoading={false}
              errorIcon={true}
              bgColor="inherit"
            />
          </Paper>
        </Grid>
        <Grid item xs={12} md={7}>
          <Details details={details} />
        </Grid>
      </Grid>
      <CommentSection comments={comments}/>
    </Container>
  )
}

export default ItemDetail
