import React, {useCallback, useEffect, useRef, useState} from 'react';
import * as signalR from "@microsoft/signalr";

export const Canvas = ({width, height}) => {
    const canvasRef = useRef(null);
    const [isPainting, setIsPainting] = useState(false);
    const [mousePosition, setMousePosition] = useState(undefined);
    const [canvasConnection, setCanvasConnection] = useState(undefined);

    const startPaint = useCallback((event) => {
        const coordinates = getCoordinates(event);
        if (coordinates) {
            setMousePosition(coordinates);
            setIsPainting(true);
        }
    }, []);

    useEffect(() => {
        const connection = new signalR.HubConnectionBuilder()
            .withUrl("/canvas")
            .build();

        connection.on("DrawLine", (line) => {
            drawLine(
                {X: parseInt(line.start.x), Y: parseInt(line.start.y)},
                {X: parseInt(line.end.x), Y: parseInt(line.end.y)})
        });

        connection.start().then(_ => setCanvasConnection(connection));

        return () => {
            connection.stop().then(_ => setCanvasConnection(undefined))
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
                        canvasConnection.invoke("DrawLine", {Start: mousePosition, End: newMousePosition});
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

