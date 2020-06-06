import React  from 'react';
import {useSelector} from "react-redux";

export function InstructionRow(props)
{
    const {data} = props;
    const language = useSelector(state => state.language);
    return (
        <div>
            <div>
                <span>Posted by: {data.createdBy} on {data.createdAt}</span>
                { (data.createdAt !== data.updatedAt) ? <span>, updated at {data.updatedAt}</span> : "" }
            </div>
            <div>{data.contents[language]}</div>
            <hr/>
        </div>
    );
}
