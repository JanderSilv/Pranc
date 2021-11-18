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
        <Grid
          container
          sx={{
            padding: { xs: 2, md: 4 },
          }}
        >
          <Head>
            <title>Sobre nós</title>
          </Head>

          <Grid container>
            <Grid
              container
              component={Typography}
              variant="h1"
              sx={{
                fontSize: { xs: '1.2rem', md: '2rem' },
                fontWeight: 600,
                flexDirection: 'row',
                alignItems: 'center',

                '& > span': {
                  marginLeft: spacing(1),
                  fontSize: { xs: '1.2rem', md: '2rem' },
                  fontWeight: 500,
                },
              }}
            >
              Sobre <span>Nós</span>
            </Grid>
          </Grid>

          <Grid
            container
            sx={{
              marginTop: 2,
            }}
          >
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
              container
              item
              md={6}
              justifyContent="center"
              sx={{
                display: { xs: 'none', md: 'flex' },
                justifyContent: 'center',
              }}
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

          <Grid
            container
            sx={{
              marginTop: 4,
            }}
          >
            <Grid
              container
              component={Typography}
              variant="h2"
              sx={{
                fontSize: { xs: '1.2rem', md: '2rem' },
                fontWeight: 600,
                flexDirection: 'row',
                alignItems: 'center',

                '& > span': {
                  marginLeft: spacing(1),
                  fontSize: { xs: '1.2rem', md: '2rem' },
                  fontWeight: 500,
                },
              }}
            >
              Tecnologias <span>Utilizadas</span>
            </Grid>

            <Grid
              container
              spacing={1}
              sx={{
                marginTop: 2,
              }}
            >
              {techs.map(tech => (
                <Grid key={tech.name} container item xs={3} md>
                  <TechCard {...tech} />
                </Grid>
              ))}
            </Grid>
          </Grid>

          <Grid
            container
            sx={{
              marginTop: 8,

              '& > h2': {
                fontSize: { xs: '1.2rem', md: '2rem' },
                fontWeight: 600,
              },
            }}
          >
            <Typography variant="h2">Equipe</Typography>
            <Grid container>
              {team.map(dev => (
                <Grid key={dev.name} container item xs={12} md={6}>
                  <TeamCard {...dev} />
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Box>
  )
}

export default AboutUs
