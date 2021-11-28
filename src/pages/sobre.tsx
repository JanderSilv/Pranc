import Head from 'next/head'
import Image from 'next/image'
import { Box, Grid, Typography, useTheme } from '@mui/material'
import { team, techs } from 'src/utils/data'
import { TechCard, TeamCard, Header } from 'src/components'

const AboutUs = () => {
  const { breakpoints, spacing } = useTheme()

  return (
    <Box bgcolor="primary.main">
      <Header enableHomeLink />
      <Box bgcolor="background.default" pb={4}>
        <Grid container p={{ xs: 2, md: 4 }}>
          <Head>
            <title>Sobre nós</title>
          </Head>

          <Grid container>
            <Typography
              variant="h1"
              fontSize={{ xs: '1.2rem', md: '2rem' }}
              fontWeight={600}
            >
              Sobre Nós
            </Typography>
          </Grid>

          <Grid container mt={2}>
            <Grid container item xs={12} md={6}>
              <Grid
                container
                item
                xs={12}
                component={Typography}
                alignItems="center"
              >
                Projeto desenvolvido como requisito para o Projeto Integrador 3
                do Curso de Engenharia de Computação do Senai Cimatec, Salvador
                - BA.
              </Grid>
              <Grid
                item
                xs={12}
                sx={{
                  [breakpoints.down('md')]: {
                    marginTop: '1rem',
                    display: 'flex',
                    justifyContent: 'center',
                  },
                }}
              >
                <Image
                  src="/assets/images/about/cimatecLogo.png"
                  alt="Cimatec logo"
                  width="370px"
                  height="112px"
                  objectFit="contain"
                  draggable="false"
                  quality={90}
                />
              </Grid>
            </Grid>
            <Grid
              item
              md={6}
              display={{ xs: 'none', md: 'flex' }}
              justifyContent="center"
            >
              <Image
                src="/assets/images/about/team.png"
                alt="Ilustração"
                width="600px"
                height="380px"
                objectFit="contain"
                draggable="false"
                quality={90}
              />
            </Grid>
          </Grid>

          <Grid container mt={4}>
            <Typography
              variant="h2"
              fontSize={{ xs: '1.2rem', md: '2rem' }}
              fontWeight={600}
            >
              Tecnologias Utilizadas
            </Typography>

            <Grid container spacing={1} mt={2}>
              {techs.map(tech => (
                <Grid
                  key={tech.name}
                  item
                  xs={3}
                  md
                  display="flex"
                  justifyContent="center"
                >
                  <TechCard {...tech} />
                </Grid>
              ))}
            </Grid>
          </Grid>

          <Grid container mt={8}>
            <Typography
              variant="h2"
              fontSize={{ xs: '1.2rem', md: '2rem' }}
              fontWeight={600}
            >
              Equipe
            </Typography>
            <Box mt={4} p={{ xs: spacing(2), sm: 'unset' }}>
              <Grid
                container
                rowSpacing={{ xs: 3, md: 6 }}
                columnSpacing={{ xs: 0, md: 3 }}
              >
                {team.map(dev => (
                  <Grid
                    key={dev.name}
                    item
                    xs={12}
                    sm
                    lg={4}
                    display="flex"
                    justifyContent="center"
                  >
                    <TeamCard {...dev} />
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  )
}

export default AboutUs
