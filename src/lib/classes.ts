import {data} from "./types"

export class LinkedListNode{
    data: data 
    constructor(data : data){
        this.data = data
    }
}

export class DoublyLinkedList {
    head :LinkedListNode
    tail :LinkedListNode
    
    constructor(value : data){
        this.head = new LinkedListNode(value)
        this.tail =   new LinkedListNode(value)
    }

}
