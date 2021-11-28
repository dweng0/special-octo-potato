import React from 'react';
import { FilterProps } from './interface';

const FilterComponent: React.FunctionComponent<FilterProps> = ({ availableGenres, handleChange, setReset, isChecked }) => {  

    return (
        <div className={'genres'}>
            {availableGenres.map(genre => {
                    return (
                        <div>
                            <input type="checkbox" id={`${genre.id}`} name={genre.name} value={`${genre.id}`} onChange={handleChange} checked={isChecked(genre.id)}/>
                            <label htmlFor={`${genre.id}`}>{genre.name}</label>
                        </div>
                    )              
                }
            )}
            <div className={"reset"} >
                <a onClick={() => setReset(!reset)} >reset</a>
            </div>
        </div>
    );
}

export default FilterComponent;