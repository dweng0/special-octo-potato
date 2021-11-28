import { Genre } from "../../interface";

export interface FilterProps { 
    availableGenres: Array<Genre>,
    handleChange: () => void,
    setReset: (reset:boolean) => void,
    isChecked: (id: number) => boolean
}