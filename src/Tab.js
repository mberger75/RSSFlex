import React from 'react';

export const tabList = [
    {emoji: '🎨', title: 'FRONT', state: 'active'},
    {emoji: '🌈', title: 'UI/UX'},
    {emoji: '🎩', title: 'BACK'},
    {emoji: '📱', title: 'MOBILE'},
    {emoji: '🔌', title: 'HARDWARE'},
    {emoji: '📹', title: 'VIDEOS'}
]

const Tab = ({state, id, emoji, title, dataLen, toggle}) => (
    <button className={'btn ' + state} onClick={() => toggle(id, title)}>
        <span role='img' aria-label='emoji'>{emoji}</span> 
        &nbsp;{title}
        {state === 'active' ? <div className="dataLength">&nbsp;{dataLen}</div> : null}
    </button>
)

export default Tab;