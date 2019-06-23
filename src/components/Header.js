import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

const Wrapper = styled.div`
  background: url("${props => props.theme.bgPattern}") #000;
  display: flex;
  position: relative;
`

const Content = styled.div`
  margin: 0 auto;
  max-width: ${props => props.theme.maxWidths.general};
  padding: 3rem 1.0875rem 3rem 1.0875rem;
  color: ${props => props.theme.colors.secondary};
  text-align: center;
  height: 600px;
  @media (max-width: ${props => props.theme.breakpoints.s}) {
    height: 500px;
  }
`

const Avatar = styled.div`
  height: 125px;
  width: 125px;
  margin: 0 auto;
  image-rendering: -moz-crisp-edges;
  image-rendering: -o-crisp-edges;
  image-rendering: -webkit-optimize-contrast;
  -ms-interpolation-mode: nearest-neighbor;

  img {
    height: 125px;
  }
`

const Name = styled.h1`
  margin: 1rem 0 0.25rem 0;
  color: ${props => props.theme.colors.heading};
  font-family: 'Pacifico', cursive;
  font-size: 3rem;

  @media (max-width: ${props => props.theme.breakpoints.s}) {
    font-size: 2rem;
  }
`

const Location = styled.div`
  font-size: 1.3rem;
  display: flex;
  align-items: center;
  justify-content: center;
`

const SocialMedia = styled.div`
  margin-top: 2rem;

  a {
    margin: 0 0.3rem;
  }
`

const Header = ({ avatar, name, location, socialMedia }) => (
  <Wrapper>
    <Content>
      <Avatar>
        <img src={avatar} alt={name} />
      </Avatar>
      <Name>{name}</Name>
      <Location>{location}</Location>
      <SocialMedia>
        {socialMedia.map(social => (
          <a key={social.name} href={social.url} rel="noopener noreferrer" target="_blank">
            {social.name}
          </a>
        ))}
      </SocialMedia>
    </Content>
  </Wrapper>
)

export default Header

Header.propTypes = {
  avatar: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired,
  socialMedia: PropTypes.array.isRequired,
}
