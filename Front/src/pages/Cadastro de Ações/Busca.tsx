import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';
import WindowedSelect from "react-windowed-select";
import { createFilter } from 'react-windowed-select';
import './Busca.css';  

interface Assets{
    nome: string,
    sigla: string
}
interface Option{
    value: Assets,
    label: string
}
interface Props{
    setValue: Function
}

// Fazer o props para pegar o assets para pesquisa
 export const  BuscaAtivo =  (props:Props) => {
    const [options, setOptions] = useState<Option[]>();
    
    useEffect(() => {
        axios.get("/ativo/buscaativos")
        .then( function(response){
            const ativos:Assets[] = response.data.lista;
            var array = ativos.map((ativos) => ({value: ativos, label: ativos.nome.concat(' - ', ativos.sigla)}));
            setOptions(array);
    
        }).catch(function(error){
            console.log(error);
        });
       
    }, []);
       
    console.log(options);
    
    return(
        <WindowedSelect
        windowThreshold={5}
        options={options}
        filterOption={createFilter({ ignoreAccents: false})}
        placeholder="Busque seu ativo"
        classNamePrefix='react-select'
        className='select'
        noOptionsMessage={()=>"Ativo não encontrado"}
        isClearable
        components={{ DropdownIndicator:() => null, IndicatorSeparator: () => null}}
        // Se o valor for diferente de null, colocamos o valor dele, caso contrário colocamos ''
        onChange={e => e ? props.setValue(e.value) : props.setValue('')}
        />
    );
}


