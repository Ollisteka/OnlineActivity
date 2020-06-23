import React, {useCallback, useEffect, useRef, useState} from 'react';
import * as signalR from "@microsoft/signalr";
import {getGameId, getUserId} from './WaitingRoom';


import "./Canvas.css";

let currentColor = 'black';

async function getCurrentCanvas() {
    const gameId = getGameId();
    const response = await fetch(`api/v1/games/${gameId}`);
    const data = await response.json();
    const lines = [];
    for (const line of data.canvasLines) {
        lines.push(
            {
                "start": {X: parseInt(line.start.x), Y: parseInt(line.start.y)},
                "end": {X: parseInt(line.end.x), Y: parseInt(line.end.y)},
                "color": line.color
            }
        );
    }

    return lines;
}

export const Canvas = ({height, width}) => {
    const canvasRef = useRef(null);
    const [isPainting, setIsPainting] = useState(false);
    const [mousePosition, setMousePosition] = useState(undefined);
    const [canvasConnection, setCanvasConnection] = useState(undefined);
    const [linesToSend, setLinesToSend] = useState([]);
    
    
    const userId = getUserId();
    const gameId = getGameId();

    const startPaint = useCallback((event) => {
        const coordinates = getCoordinates(event);
        if (coordinates) {
            setMousePosition(coordinates);
            setIsPainting(true);
        }
    }, []);

    useEffect(async () => {
        const connection = new signalR.HubConnectionBuilder()
            .withUrl("/canvas")
            .build();

        connection.on("DrawLines", (drawLinesDto) => {
            for (const line of drawLinesDto.lines) {
                drawLine(
                    {X: parseInt(line.start.x), Y: parseInt(line.start.y)},
                    {X: parseInt(line.end.x), Y: parseInt(line.end.y)},
                    line.color)
            }
        });

        await connection.start();
        await connection.invoke("AddToGroup", {
            userId,
            gameId
        });
        setCanvasConnection(connection);

        const currentCanvas = await getCurrentCanvas();
        for (const line of currentCanvas)
            drawLine(line.start, line.end, line.color);

        return () => {
            canvasConnection.invoke("RemoveFromGroup", {
                userId,
                gameId
            }).then(_ => canvasConnection.stop().then(_ => setCanvasConnection(undefined)))
        }
    }, []);


    useEffect(() => {
        if (!canvasRef.current) {
            return;
        }
        const canvas = canvasRef.current;
        canvas.addEventListener('mousedown', startPaint);
        return () => {
            canvas.removeEventListener('mousedown', startPaint);
        };
    }, [startPaint]);

    const paint = useCallback(
        (event) => {
            if (isPainting) {
                const newMousePosition = getCoordinates(event);
                if (mousePosition && newMousePosition) {
                    const newLine = {
                        start: mousePosition,
                        end: newMousePosition,
                        color: currentColor
                    };
                    setLinesToSend(lines => lines.concat(newLine));
                    drawLine(mousePosition, newMousePosition, currentColor);
                    setMousePosition(newMousePosition);
                }
            }
        },
        [isPainting, mousePosition, canvasConnection]
    );

    useEffect(() => {
        if (!canvasRef.current) {
            return;
        }
        const canvas = canvasRef.current;
        canvas.addEventListener('mousemove', paint);
        return () => {
            canvas.removeEventListener('mousemove', paint);
        };
    }, [paint]);

    const exitPaint = async () => {
        setIsPainting(false);
        setMousePosition(undefined);
        if (canvasConnection && linesToSend.length > 0) {
            await canvasConnection.invoke("DrawLines", {
                lines: linesToSend,
                gameId,
                userId
            });
            setLinesToSend([]);
        }
    };

    useEffect(() => {
        if (!canvasRef.current) {
            return;
        }
        const canvas = canvasRef.current;
        canvas.addEventListener('mouseup', exitPaint);
        canvas.addEventListener('mouseleave', exitPaint);
        return () => {
            canvas.removeEventListener('mouseup', exitPaint);
            canvas.removeEventListener('mouseleave', exitPaint);
        };
    }, [exitPaint]);

    const getCoordinates = (event) => {
        if (!canvasRef.current) {
            return;
        }

        const canvas = canvasRef.current;
        return {X: event.pageX - canvas.offsetLeft, Y: event.pageY - canvas.offsetTop};
    };

    const drawLine = (originalMousePosition, newMousePosition, color) => {
        if (!canvasRef.current) {
            return;
        }

        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        if (context) {
            context.strokeStyle = color;
            context.lineJoin = 'round';
            context.lineWidth = 5;

            context.beginPath();
            context.moveTo(originalMousePosition.X, originalMousePosition.Y);
            context.lineTo(newMousePosition.X, newMousePosition.Y);
            context.closePath();

            context.stroke();
        }
    };

    return (
        <div>
            <ul className={'palette'}>
                <li>
                    <button className={'red'} onClick={() => {
                        currentColor = 'red';
                    }}>{currentColor === 'red' ? '★' : ''}</button>
                </li>
                <li>
                    <button className={'green'} onClick={() => {
                        currentColor = 'green';
                    }}>{currentColor === 'green' ? '★' : ''}</button>
                </li>
                <li>
                    <button className={'black'} onClick={() => {
                        currentColor = 'black';
                    }}>{currentColor === 'black' ? '★' : ''}</button>
                </li>
                <li>
                    <button className={'white'} onClick={() => {
                        currentColor = 'white';
                    }}>{currentColor === 'white' ? '★' : ''}</button>
                </li>
                <li>
                    <button className={'yellow'} onClick={() => {
                        currentColor = 'yellow';
                    }}>{currentColor === 'yellow' ? '★' : ''}</button>
                </li>
                <li>
                    <button className={'blue'} onClick={() => {
                        currentColor = 'blue';
                    }}>{currentColor === 'blue' ? '★' : ''}</button>
                </li>
            </ul>
            <canvas ref={canvasRef} height={height} width={width}/>
        </div>
    );
};

Canvas.defaultProps = {
    width: window.innerWidth,
    height: window.innerHeight,
};

