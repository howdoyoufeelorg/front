import React, {useState, useEffect}  from 'react';

export function Instruction(props)
{
    const {data} = props;
    return (
        <div>
            <div>
                <span>Posted by: {data.createdBy} on {data.createdAt}</span>
                { (data.createdAt !== data.updatedAt) ? <span>, updated at {data.updatedAt}</span> : "" }
            </div>
            <div>{data.contents}</div>
            <hr/>
        </div>
    );
}