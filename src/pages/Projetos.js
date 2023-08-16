import React, { useContext, useEffect, useState } from 'react';
import { Container, Card, Button, Row } from 'react-bootstrap';
import axios from 'axios';
import Header from '../components/Header';
import { UserContext } from '../contexts/UserContext';

const Projetos = () => {
  const { usuario } = useContext(UserContext);
  const { projetos, setProjetos } = useContext(UserContext);
  const [ detailsProject, setDetailsProject ] = useState(''); // Track the project details to show

  function getApiGitHub() {
    axios
      .get(`https://api.github.com/users/${usuario}/repos`)
      .then((res) => {
        console.log(res.data);
        setProjetos(res.data);
      })
      .catch((e) => console.log(e));
  }

  useEffect(() => {
    getApiGitHub();
  }, []);

  const showDetails = (project) => {
    setDetailsProject(project); // Set the project for which details should be shown
  };

  return (
    <Container>
      <Header h={'h2'} title={'GitHub API'} />
      <h3 className="text-center mt-5 mb-3">Meus Projetos</h3>
      {projetos && projetos.length > 0 ? (
        projetos.map(({ id, name, html_url, created_at, private: privado, language }) => (
          <Card key={id} className="mb-3 p-3 bg-light m-auto">
            <Card.Title>Name: {name}</Card.Title>
            <Card.Link href={html_url}>Link: {html_url}</Card.Link>
            <Card.Text>Criado: {created_at}</Card.Text>
            {detailsProject && detailsProject.id === id && ( // Only show details for the selected project
              <>
                {privado === true ? (
                  <Card.Text>Privado: Sim</Card.Text>
                ) : (
                  <Card.Text>Privado: Não</Card.Text>
                )}
                <Card.Text>Linguagem: {language}</Card.Text>
              </>
            )}
            <Row xs="auto" className="d-flex justify-content-end">
              <Button onClick={() => showDetails({ id, privado, language })} variant="secondary">
                Detalhar
              </Button>
            </Row>
          </Card>
        ))
      ) : (
        <p className="text-center">Não existe nenhum commit!</p>
      )}
    </Container>
  );
};

export default Projetos;
