import React from 'react'

const Mode = ({changeMode, mode}) => {
    return (
        <div style={{textAlign:'right'}}>
            <i className={`mode-sty ${mode ? "fas fa-sun": "fas fa-moon" }`} onClick={changeMode}></i>
        </div>
    )
}

export default Mode
