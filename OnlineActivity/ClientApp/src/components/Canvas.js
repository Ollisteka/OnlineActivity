import React, {useCallback, useEffect, useRef, useState} from 'react';
import * as signalR from "@microsoft/signalr";
import {getGameId, getUserId} from './WaitingRoom';

async function getCurrentCanvas() {
    const gameId = getGameId();
    const response = await fetch(`api/v1/games/${gameId}`);
    const data = await response.json();
    const lines = [];
    for (const line of data.canvasLines) {
        lines.push(
            {
                "start": {X: parseInt(line.start.x), Y: parseInt(line.start.y)},
                "end": {X: parseInt(line.end.x), Y: parseInt(line.end.y)}
            }
        );
    }

    return lines;
}

export const Canvas = ({width, height}) => {
    const canvasRef = useRef(null);
    const [isPainting, setIsPainting] = useState(false);
    const [mousePosition, setMousePosition] = useState(undefined);
    const [canvasConnection, setCanvasConnection] = useState(undefined);

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

        connection.on("DrawLine", (drawLineDto) => {
            const line = drawLineDto.line;
            drawLine(
                {X: parseInt(line.start.x), Y: parseInt(line.start.y)},
                {X: parseInt(line.end.x), Y: parseInt(line.end.y)})
        });

        await connection.start();
        await connection.invoke("AddToGroup", {
            userId,
            gameId
        });
        setCanvasConnection(connection);

        const currentCanvas = await getCurrentCanvas();
        for (const line of currentCanvas)
            drawLine(line.start, line.end);

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
                    if (canvasConnection)
                        canvasConnection.invoke("DrawLine", {
                            line: {
                                start: mousePosition,
                                end: newMousePosition
                            },
                            gameId,
                            userId
                        });
                    drawLine(mousePosition, newMousePosition);
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

    const exitPaint = useCallback(() => {
        setIsPainting(false);
        setMousePosition(undefined);
    }, []);

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

    const drawLine = (originalMousePosition, newMousePosition) => {
        if (!canvasRef.current) {
            return;
        }

        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        if (context) {
            context.strokeStyle = 'red';
            context.lineJoin = 'round';
            context.lineWidth = 5;

            context.beginPath();
            context.moveTo(originalMousePosition.X, originalMousePosition.Y);
            context.lineTo(newMousePosition.X, newMousePosition.Y);
            context.closePath();

            context.stroke();
        }
    };

    return <canvas ref={canvasRef} height={height} width={width}/>;
};

Canvas.defaultProps = {
    width: window.innerWidth,
    height: window.innerHeight,
};

