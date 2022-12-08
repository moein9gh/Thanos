import express from "express";

export function newServer(routes:express.Router) :express.Express{
    return express().use(routes)
}

