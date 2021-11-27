import React from 'react';
import { TitleProps } from './interface';

/**
 * Renders a title component
 * @param title the text to render
 * @author Jay Martin
 */
const Title: React.FunctionComponent<TitleProps> = ({ text }) =>  {
    return (
        <h1>
            <span>
                <span role="img" aria-label="Popcorn emoji">
                    🍿  
                </span>
                {text}
            </span>
        </h1>
    )
}
export default Title