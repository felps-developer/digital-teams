import { Card } from "primereact/card"
import { Button } from "primereact/button"
import { Sidebar } from 'primereact/sidebar';
import { useContext, useEffect, useRef, useState } from "react";
import { Dialog } from 'primereact/dialog';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { InputText } from "primereact/inputtext"
import { InputMask } from "primereact/inputmask"
import { useForm } from "react-hook-form";
import { FilterContext } from "../../App";


const List = () => {



    const [mostrarSidebar, setMostrarSidebar] = useState(false)
    const [mostrarSidebarAdd, setMostrarSidebarAdd] = useState(false)
    const [mostrarDiolog, setMostrarDiolog] = useState(false)
    const [teams, setTeams] = useState([])
    const { filter } = useContext(FilterContext)
    const [teamsFiltered, setTeamsFiltered] = useState([])
    const teamSelected = useRef()

    const { register, handleSubmit, reset } = useForm({
        defaultValues: {
            participantes: []
        }
    });
    const { register: registerP, handleSubmit: handleSubmitP, reset: resetP, setValue: setValueP } = useForm();

    async function cadastrar(dados) {
        const request = await fetch(`http://localhost:3000/teams/${dados.id}`, {
            method: 'post',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(dados)
        })
        const response = await request.json();
        if (response) {
            reset();
            setMostrarSidebar(false);
            buscarTeams();
        }
    }

    async function addParticipante(dados) {
        const team = teams.find(team => team.id == dados.id);
        team.participantes.push(dados.nome);

        const request = await fetch(`http://localhost:3000/teams/${dados.id}`, {
            method: 'put',
            headers: {
                "Content-type": "application/json"

            },
            body: JSON.stringify(team)
        });
        const response = await request.json();
        if (response) {
            resetP();
            buscarTeams();
        }
    }



    async function buscarTeams() {
        const resquest = await fetch("http://localhost:3000/teams")
        const response = await resquest.json()
        setTeams(response)
    }

    useEffect(() => {

        buscarTeams();

    }, [])

    function handleConfirmation(id) {
        confirmDialog({
            header: 'Aviso:',
            message: 'Deseja realmente apagar este item?',
            acceptLabel: 'Sim',
            rejectLabel: 'Não',
            accept: async () => {
                await fetch(`http://localhost:3000/teams/${id}`, {
                    method: 'delete'
                })
                    .finally(() => {

                        buscarTeams();
                    })
            },
        })
    }



    useEffect(() => {
        if (filter != "") {
            setTeamsFiltered([...teams.filter((team) => team.nome.toLowerCase().includes(filter.toLowerCase()))]);
            return;
        }
        setTeamsFiltered(teams)
    }, [filter, teams]);


    const titulo = (nome, id) => (
        <div className="flex justify-content-between align-items-center text-lg">
            {nome}
            <i className="pi pi-eye cursor-pointer" onClick={() => {
                teamSelected.current = id;
                setMostrarDiolog(true)

            }}
            ></i>
        </div>
    )
    const footer = (id) => (
        <div className="flex gap-3">
            <Button label="Adicionar" className="flex-1 px-0" onClick={
                () => {
                    setValueP('id', id)
                    setMostrarSidebarAdd(true)
                }} />
            <Button icon="pi pi-trash" onClick={() => handleConfirmation(id)} />
        </div>
    )

    return (
        <section className="flex flex-wrap gap-3 px-8">
            <h2 className="w-full flex align-items-center justify-content-between ">
                Teams
                <Button
                    label="novo team"
                    icon="pi pi-plus"
                    onClick={() => setMostrarSidebar(true)}
                />
            </h2>
            {teams &&
                teamsFiltered.map((team) => (
                    <Card key={`team${team.id}`} style={{ width: 'calc(20% - 13px)' }} title={() => titulo(team.nome, team.id)} footer={footer(team.id)}>
                        <h1 className="mx-auto flex flex-column text-center">{team.participantes.length}<span className="text-sm">/{team.capacidade}</span></h1>
                    </Card>
                ))

            }


            <Sidebar
                visible={mostrarSidebar}
                onHide={() => setMostrarSidebar(false)}
                position="right"
            >
                <form onSubmit={handleSubmit(cadastrar)}>
                    <h3>Cadastrar</h3>
                    <label htmlFor="nome">Nome</label>
                    <InputText
                        id="nome"
                        placeholder="Digite o nome do time"
                        className="w-full mb-3"
                        {...register('nome', { required: true })}
                    />
                    <label htmlFor="capacidade">Capacidade</label>
                    <InputMask
                        id="capacidade"
                        mask={'99'}
                        className="w-full mb-3"
                        {...register('capacidade', { required: true })}
                    />
                    <Button
                        label="Criar"
                        className="w-full"
                        type="submit"
                    />
                </form>
            </Sidebar>

            <Dialog
                visible={mostrarDiolog}
                onHide={() => setMostrarDiolog(false)}
            >
                Lista de nomes do time:
                {
                    // tamanhoTime = 
                    teamSelected.current && teams.find(team => team.id == teamSelected.current).participantes.map((nome, index, array) => (
                        <h5 className="flex justify-content-between align-items-center" key={index}> {nome} <i className="pi pi-trash cursor-pointer" onClick={() => alert("deletou")}></i></h5>

                    ))
                }

            </Dialog>

            <Sidebar
                visible={mostrarSidebarAdd}
                onHide={() => setMostrarSidebarAdd(false)}
                position="right"
            >
                <form onSubmit={handleSubmitP(addParticipante)}>
                    <h3>Cadastrar</h3>
                    <input type="hidden" {...registerP('id')} />
                    <label htmlFor="nome">Nome</label>
                    <InputText
                        id="nome"
                        placeholder="Digite o nome do participante"
                        className="w-full mb-3"
                        {...registerP('nome', { required: true })}
                    />
                    <Button
                        label="Adicionar"
                        className="w-full"
                        type="submit"
                    />
                </form>
            </Sidebar>

            <ConfirmDialog />
        </section>
    );
}

export default List;