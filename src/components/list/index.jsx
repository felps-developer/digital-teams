import { Card } from "primereact/card"
import { Button } from "primereact/button"
import { Sidebar } from 'primereact/sidebar';
import { useEffect, useState } from "react";
import { Dialog } from 'primereact/dialog';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';




const List = () => {

    const [mostrarSidebar, setMostrarSidebar] = useState(false)
    const [mostrarSidebarAdd, setMostrarSidebarAdd] = useState(false)
    const [mostrarDiolog, setMostrarDiolog] = useState(false)
    const [teams,setTeams] = useState([])

   async function buscarTeams(){
        const resquest = await fetch("http://localhost:3000/teams")
        const response = await resquest.json()
        setTeams(response)
    }

    useEffect(() => {

        buscarTeams();
        
    }, [])

    function handleConfirmation() {
        confirmDialog({
            header: 'Aviso:',
            message: 'Deseja realmente apagar este item?',
            acceptLabel: 'Sim',
            rejectLabel: 'Não',
            accept: () => {
                alert('confirmou!')
            },
        })
    }


    const titulo = (
        <div className="flex justify-content-between align-items-center text-lg">
            titulo do card
            <i className="pi pi-eye cursor-pointer" onClick={() => setMostrarDiolog(true)}></i>
        </div>
    )
    const footer = (
        <div className="flex gap-3">
            <Button label="Adicionar" className="flex-1 px-0" onClick={() => setMostrarSidebarAdd(true)} />
            <Button icon="pi pi-trash" onClick={handleConfirmation} />
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
            <Card style={{ width: 'calc(20% - 13px)' }} title={titulo} footer={footer}>
                <h1 className="mx-auto flex flex-column text-center">0<span className="text-sm">/ 0</span></h1>
            </Card>
            <Card style={{ width: 'calc(20% - 13px)' }} title={titulo} footer={footer}>
                <h1 className="mx-auto flex flex-column text-center">0<span className="text-sm">/ 0</span></h1>
            </Card>
            <Card style={{ width: 'calc(20% - 13px)' }} title={titulo} footer={footer}>
                <h1 className="mx-auto flex flex-column text-center">0<span className="text-sm">/ 0</span></h1>
            </Card>
            <Card style={{ width: 'calc(20% - 13px)' }} title={titulo} footer={footer}>
                <h1 className="mx-auto flex flex-column text-center">0<span className="text-sm">/ 0</span></h1>
            </Card>
            <Card style={{ width: 'calc(20% - 13px)' }} title={titulo} footer={footer}>
                <h1 className="mx-auto flex flex-column text-center">0<span className="text-sm">/ 0</span></h1>
            </Card>
            <Card style={{ width: 'calc(20% - 13px)' }} title={titulo} footer={footer}>
                <h1 className="mx-auto flex flex-column text-center">0<span className="text-sm">/ 0</span></h1>
            </Card>

            <Sidebar
                visible={mostrarSidebar}
                onHide={() => setMostrarSidebar(false)}
                position="right"
            >
                Teste
            </Sidebar>

            <Dialog
                visible={mostrarDiolog}
                onHide={() => setMostrarDiolog(false)}


            >

            </Dialog>

            <Sidebar
                visible={mostrarSidebarAdd}
                onHide={() => setMostrarSidebarAdd(false)}
                position="right"
            >
                Tela2-adicionar
            </Sidebar>

            <ConfirmDialog/>
        </section>
    );
}

export default List;