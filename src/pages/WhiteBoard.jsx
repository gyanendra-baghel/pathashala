import React, { useRef, useEffect } from 'react';
import { useSocket } from "../context/BoardContext";
import io from 'socket.io-client';
import Header from '../components/Header';
import Footer from '../components/Footer';

function WhiteBoard() {
    const canvasRef = useRef();
    const socket = useSocket();

    useEffect(() => {
        let isDrawing = false;
        let lastX = 0;
        let lastY = 0;

        const startDrawing = (e) => {
            isDrawing = true;
            [lastX, lastY] = [e.offsetX, e.offsetY];
        };

        const draw = (e) => {
            if (!isDrawing) return;
            const canvas = canvasRef.current;
            const ctx = canvas.getContext('2d');
            if (ctx) {
                ctx.beginPath();
                ctx.moveTo(lastX, lastY);
                ctx.lineTo(e.offsetX, e.offsetY);
                ctx.stroke();
            }
            [lastX, lastY] = [e.offsetX, e.offsetY];
        };

        const endDrawing = () => {
            isDrawing = false;
        };

        const canvas = canvasRef.current;
        canvas.width = window.screen.availWidth;
        canvas.height = window.screen.availHeight;

        // Event listeners for drawing
        canvas.addEventListener('mousedown', startDrawing);
        canvas.addEventListener('mousemove', draw);
        canvas.addEventListener('mouseup', endDrawing);
        canvas.addEventListener('mouseout', endDrawing);

        return () => {
            // Clean up event listeners when component unmounts
            canvas.removeEventListener('mousedown', startDrawing);
            canvas.removeEventListener('mousemove', draw);
            canvas.removeEventListener('mouseup', endDrawing);
            canvas.removeEventListener('mouseout', endDrawing);
        };
    }, []);

    useEffect(() => {
        if (socket) {
            socket.on('drawing', (data) => {
                const canvas = canvasRef.current;
                const ctx = canvas.getContext('2d');
                if (ctx) {
                    ctx.beginPath();
                    ctx.moveTo(data.lastX, data.lastY);
                    ctx.lineTo(data.currentX, data.currentY);
                    ctx.stroke();
                }
            });
        }

        return () => {
            if (socket) {
                socket.off('drawing');
            }
        };
    }, [socket]);

    const handleMouseMove = (e) => {
        if (!socket) return;

        // Emit drawing data to the socket
        socket.emit('drawing', {
            lastX: e.nativeEvent.offsetX,
            lastY: e.nativeEvent.offsetY,
            currentX: e.nativeEvent.offsetX,
            currentY: e.nativeEvent.offsetY
        });
    };

    return (
        <>
        <Header/>
            `<div className="white-board-container">
                <canvas
                    ref={canvasRef}
                    className="white-board"
                    onMouseMove={handleMouseMove}
                />
            </div>
            <Footer/>
        </>

    );
}

export default WhiteBoard;
