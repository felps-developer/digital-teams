import { InputText } from 'primereact/inputtext';
import { useContext } from 'react';
import { FilterContext } from '../../App';

const Header = () => {
    const { setFilter } = useContext(FilterContext);
    return (
        <>
            <header className='flex align-items-center gap-3 px-8'>
                <div className="logo cursor-pointer">
                    <h1>Logo</h1>
                </div>
                <div className="pesquisa relative w-4">
                    <i className="pi pi-search absolute z-index-1 right-0 top-50 -mt-2 mr-3 cursor-pointer" ></i>
                    <InputText
                        className='w-full'
                        placeholder='Pesquisar por nome'
                        onChange={(e) => setFilter(e.target.value)}
                    />
                </div>

            </header>
        </>
    );
}

export default Header;


