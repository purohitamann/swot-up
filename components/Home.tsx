import React from 'react'
import SafariBrowserFrame from './Window'
export default function home() {
    return (
        <div>
            <div style={{ width: '800px', height: '600px' }}>
                <SafariBrowserFrame>
                    <h1>Hello, World!</h1>
                    <p>This is your content inside the Safari browser frame.</p>
                </SafariBrowserFrame>
            </div>
        </div>
    )
}

