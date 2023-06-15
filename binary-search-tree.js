"use strict";

class Node {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }

  /** findRecursively(val): Search from the invoking node for a node with value val.
  * Returns the node, if found; else undefined. Uses recursion. */

  findRecursively(val) {
    if (val === this.val) {
      return this;
    }

    const nextNode = val < this.val ? this.left : this.right;
    return nextNode?.findRecursively(val) || undefined;
  }

  /** insertRecursively(val): Starting at the invoking node, insert a new node
   * into the BST with value val. Returns the inserted node. Uses recursion. */

  insertRecursively(val) {
    if (val < this.val) {
      if (!this.left) {
        this.left = new Node(val);
        return this.left;
      } else {
        this.left.insertRecursively(val);
      }
    } else { // val > this.val
      if (!this.right) {
        this.right = new Node(val);
        return this.right;
      } else {
        this.right.insertRecursively(val);
      }
    }
  }

  /** dfsPreOrder(): Traverse from the invoking node using pre-order DFS.
  * Returns an array of visited nodes. */

  dfsPreOrder(nodes = []) {
    nodes.push(this.val);
    this.left?.dfsPreOrder(nodes);
    this.right?.dfsPreOrder(nodes);

    return nodes;
  }

  /** dfsInOrder(): Traverse from the invoking node using in-order DFS.
  * Returns an array of visited nodes. */

  dfsInOrder(nodes = []) {
    this.left?.dfsInOrder(nodes);
    nodes.push(this.val);
    this.right?.dfsInOrder(nodes);

    return nodes;
  }

  /** dfsPostOrder(): Traverse from the invoking node using post-order DFS.
  * Returns an array of visited nodes. */

  dfsPostOrder(nodes = []) {
    this.left?.dfsPostOrder(nodes);
    this.right?.dfsPostOrder(nodes);
    nodes.push(this.val);

    return nodes;
  }

  findNodeAndParentRecursively(val, parent = null) {
    if (val === this.val) {
      return [this, parent];
    }

    const nextNode = val < this.val ? this.left : this.right;
    return nextNode?.findNodeAndParentRecursively(val, this) || undefined;
  }

}


class BinarySearchTree {
  constructor(root = null) {
    this.root = root;
  }

  /** insert(val): Insert a new node into the BST with value val.
   * Returns the tree instance. Uses iteration. */

  insert(val) {
    if (!this.root) {
      this.root = new Node(val);
      return this;
    }

    let cur = this.root;
    let prev;
    while (cur) {
      prev = cur;
      cur = (val < cur.val ? cur.left : cur.right);
    }

    const newNode = new Node(val);
    if (val < prev.val) {
      prev.left = newNode;
    } else {
      prev.right = newNode;
    }

    return this;
  }

  /** insertRecursively(val): Insert a new node into the BST with value val.
   * Returns the tree instance. Uses recursion. */

  insertRecursively(val) {
    if (!this.root) {
      this.root = new Node(val);
      return this;
    }

    this.root.insertRecursively(val);
    return this;
  }

  /** find(val): Search the BST for a node with value val.
   * Returns the node, if found; else undefined. Uses iteration. */

  find(val) {
    let cur = this.root;
    while (cur) {
      if (val === cur.val) {
        return cur;
      }

      cur = (val < cur.val ? cur.left : cur.right);
    }

    return undefined;
  }

  /** findRecursively(val): Search the BST for a node with value val.
   * Returns the node, if found; else undefined. Uses recursion. */

  findRecursively(val) {
    if (!this.root) {
      return undefined;
    }

    return this.root.findRecursively(val);
  }

  /** dfsPreOrder(): Traverse the BST using pre-order DFS.
   * Returns an array of visited nodes. */

  dfsPreOrder() {
    if (!this.root) {
      return [];
    }

    return this.root.dfsPreOrder();
  }

  /** dfsInOrder(): Traverse the BST using in-order DFS.
   * Returns an array of visited nodes. */

  dfsInOrder() {
    if (!this.root) {
      return [];
    }

    return this.root.dfsInOrder();
  }

  /** dfsPostOrder(): Traverse the BST using post-order DFS.
   * Returns an array of visited nodes. */

  dfsPostOrder() {
    if (!this.root) {
      return [];
    }

    return this.root.dfsPostOrder();
  }

  /** bfs(): Traverse the BST using BFS.
   * Returns an array of visited nodes. */

  bfs() {
    if (!this.root) {
      return [];
    }

    const visited = [];

    const queue = [this.root];
    while (queue.length) {
      const node = queue.shift();

      visited.push(node.val);

      if (node.left) {
        queue.push(node.left);
      }
      if (node.right) {
        queue.push(node.right);
      }
    }

    return visited;
  }

  /** findSuccessorNode(node): Find and return node with next largest value.
   * Returns undefined if no successor. */

  findSuccessorNode(node) {

  }

  findReplacementAndDeleteIt(node) {
    if (node.left) {
      let cur = node.left;
      let prev = node;
      while (cur.right) {
        prev = cur;
        cur = cur.right;
      }
      prev.right = null;
      return cur;
    }
    if (node.right) {
      let cur = node.right;
      let prev = node;
      while (cur.left) {
        prev = cur;
        cur = cur.left;
      }
      prev.left = null;
      return cur;
    }
    return null;
  }

  /** Further Study!
   * remove(val): Removes a node in the BST with the value val.
   * Returns the removed node. */

  remove(val) {
    if (!this.root) {
      return null;
    }


    const [toRemove, parent] = this.root.findNodeAndParentRecursively(val) || [null, null];
    if (!toRemove) {
      return null;
    }

    if (!parent) {
      const replacement = this.findReplacementAndDeleteIt(toRemove);
      console.log(replacement);
      this.root = replacement
      return toRemove;
    }

    const isLeftChild = (toRemove.val < parent.val);

    if (isLeftChild) {
      parent.left = this.findReplacementAndDeleteIt(toRemove);
    } else {
      parent.right = this.findReplacementAndDeleteIt(toRemove);
    }
  }
}

module.exports = {
  BinarySearchTree,
  Node,
};
