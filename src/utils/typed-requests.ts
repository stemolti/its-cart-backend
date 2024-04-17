import { Request } from "express";
import { ParamsDictionary } from 'express-serve-static-core';
import { ParsedQs } from 'qs';
/**
 * T è il body
 * Q è il query params
 * P è il params
 * 
 * Perché usare questa soluzione anziché la classe Request di Express?
 * 
 * Perché usare T = unknown ?
 * 
 */

export interface TypedRequest<T = unknown, Q = ParsedQs, P = ParamsDictionary> extends Request<P, any, T, Q> {}

//Facciamo un esempio sui generics

//Per rendere la classe piu verstaile uso i generics
//class TestGeneric<T>
/* class TestGeneric<T>{
    protected data!: T;

    setData( value: T){
        this.data = value;

    }

    getData(){
        return this.data;
    }

    const t = new TestGeneric<number>();
    t.getData();

} */