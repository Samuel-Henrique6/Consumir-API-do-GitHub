import React, { useContext } from 'react'
import { Button, Container, Nav, Navbar } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { UserContext } from '../contexts/UserContext'

const NavBar = () => {

    const { setLogado } = useContext(UserContext)
    const { setUsuario } = useContext(UserContext)
    const { setUser} = useContext(UserContext)
    const navigate = useNavigate()

    function logout() {
        setLogado(false)
        setUsuario('')
        setUser('')
        navigate('/')
    }

  return (
      <Navbar expand="lg" className="bg-body-tertiary" bg="dark" data-bs-theme="dark">
          <Container>
              <Navbar.Brand as={Link} to={'/'}>API GitHub</Navbar.Brand>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                  <Nav className="me-auto">
                      <Nav.Link as={Link} to={'/projetos'}>
                          Projetos
                      </Nav.Link>
                      <Nav.Link onClick={logout}>
                          Sair
                      </Nav.Link>
                  </Nav>
              </Navbar.Collapse>
          </Container>
      </Navbar>
  )
}

export default NavBar