import React, { useState, useContext, useEffect } from 'react'
import { Container, Form, Col, FloatingLabel, Button, Row, Image } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import Header from '../components/Header';
import { UserContext } from '../contexts/UserContext';

const ApiGitHub = () => {

    const {
        handleSubmit,
        register,
        formState: { errors },
    } = useForm();

    const { user, setUser } = useContext(UserContext)
    const { usuario, setUsuario } = useContext(UserContext)
    const { logado, setLogado } = useContext(UserContext)

    function getApiGitHub() {
        axios.get(`https://api.github.com/users/${usuario}`)
            .then(res => {
                console.log(res.data);
                setUser(res.data);
                setLogado(true);                
            })
            .catch(e => {
                console.log(e);
            });
    }

    function onSubmit() {
        getApiGitHub()
    }

    return (
        <Container>

            {!logado ? (
                <Form
                    noValidate
                    validated={!!errors}
                    onSubmit={handleSubmit(onSubmit)}
                    className="bg-light rounded p-5 shadow w-50 m-auto mt-2"
                >
                    <Col>
                        <Form.Group className="mb-3">
                            <FloatingLabel label="Usúario do GitHub">
                                <Form.Control
                                    type="text"
                                    placeholder="Informe o usúario do GitHub"
                                    isInvalid={errors.usuario}
                                    required
                                    id="user"
                                    name="user"
                                    {...register('user', {
                                        required: {
                                            value: true,
                                            message: 'Usuário é obrigatório.',
                                        },
                                    })}
                                    value={usuario}
                                    onChange={(e) => setUsuario(e.target.value)}
                                />
                                {errors.usuario && (
                                    <Form.Control.Feedback type="invalid">
                                        {errors.usuario.message}
                                    </Form.Control.Feedback>
                                )}
                            </FloatingLabel>
                        </Form.Group>
                        <div className="d-flex justify-content-between">
                            <Button type="submit">Buscar Dados</Button>
                        </div>
                    </Col>
                </Form>
            ) : (
                <>
                    <Header h={'h3'} title={`Esse é o portfólio do ${user.name} e vamos mostrar um pouco sobre ele`} />
                    <Row>
                        <Col xs={6} md={4}>
                            <Image src={user.avatar_url} roundedCircle fluid />
                        </Col>
                        <Col xs={6} md={6}>
                            <h5>Vamos deixar ele se apresentar</h5>
                            {user.bio ? (
                                <p>{user.bio}</p>
                            ) : (
                                <p>Não tem  conteúdo na Bio do GitHub</p>
                            )}
                        </Col>
                    </Row>
                </>
            )}
        </Container>
    )
}

export default ApiGitHub