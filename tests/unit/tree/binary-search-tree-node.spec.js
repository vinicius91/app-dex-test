/// <reference types="Cypress" />

import BinarySearchTreeNode from '../../../src/domain/tree/binary-search-tree-node';
import AppModel from '../../../src/domain/app.model';

describe('BinarySearchTreeNode', () => {
  const appA = new AppModel('App A', ['Some Guy'], 7, 63, ['domainA']);

  const appB = new AppModel('App B', ['Some Guy'], 7, 64, ['domainA']);

  const appC = new AppModel('App C', ['Some Guy'], 7, 65, ['domainA']);

  const appD = new AppModel('App D', ['Another Guy'], 7, 70, ['domainA']);

  const appE = new AppModel('App E', ['Another Guy'], 7, 70, ['domainA']);

  const appF = new AppModel('App F', ['Another Guy'], 7, 80, ['domainA']);

  const appG = new AppModel('App G', ['Another Guy'], 7, 90, ['domainA']);

  it('should create binary search tree', () => {
    const bstNode = new BinarySearchTreeNode(appB);

    expect(bstNode.value).to.eq(appB);
    expect(bstNode.left).to.be.null;
    expect(bstNode.right).to.be.null;
  });

  it('should insert in itself if it is empty', () => {
    const bstNode = new BinarySearchTreeNode();
    bstNode.insert(appA);

    expect(bstNode.value).to.eq(appA);
    expect(bstNode.left).to.be.null;
    expect(bstNode.right).to.be.null;
  });

  it('should insert nodes in correct order', () => {
    const bstNode = new BinarySearchTreeNode(appB);
    const insertedNode1 = bstNode.insert(appA);

    expect(insertedNode1.value).to.eq(appA);
    expect(bstNode.toString()).to.eq('App A,App B');
    expect(bstNode.contains(appA)).to.eq(true);
    expect(bstNode.contains(appC)).to.eq(false);

    const insertedNode2 = bstNode.insert(appC);

    expect(insertedNode2.value).to.eq(appC);
    expect(bstNode.toString()).to.eq('App A,App B,App C');
    expect(bstNode.contains(appC)).to.eq(true);
    expect(bstNode.contains(appD)).to.eq(false);

    bstNode.insert(appG);

    expect(bstNode.toString()).to.eq('App A,App B,App C,App G');
    expect(bstNode.contains(appG)).to.eq(true);
    expect(bstNode.contains(appF)).to.eq(false);

    bstNode.insert(appD);

    expect(bstNode.toString()).to.eq('App A,App B,App C,App D,App G');
    expect(bstNode.contains(appD)).to.eq(true);
    expect(bstNode.contains(appF)).to.eq(false);

    bstNode.insert(appE);

    expect(bstNode.toString()).to.eq('App A,App B,App C,App D,App E,App G');
    expect(bstNode.contains(appE)).to.eq(true);
    expect(bstNode.contains(appF)).to.eq(false);
  });

  it('should not insert duplicates', () => {
    const bstNode = new BinarySearchTreeNode(appB);
    bstNode.insert(appA);

    expect(bstNode.toString()).to.eq('App A,App B');
    expect(bstNode.contains(appA)).to.eq(true);
    expect(bstNode.contains(appC)).to.eq(false);

    bstNode.insert(appA);

    expect(bstNode.toString()).to.eq('App A,App B');
    expect(bstNode.contains(appA)).to.eq(true);
    expect(bstNode.contains(appC)).to.eq(false);
  });

  it('should find min node', () => {
    const node = new BinarySearchTreeNode(appC);

    node.insert(appD);
    node.insert(appE);
    node.insert(appB);
    node.insert(appF);
    node.insert(appA);

    expect(node.findMin()).not.to.be.null;
    expect(node.findMin().value).to.eq(appA);
  });

  it('should find node', () => {
    const node = new BinarySearchTreeNode(appC);

    node.insert(appD);
    node.insert(appE);
    node.insert(appB);
    node.insert(appF);
    node.insert(appA);

    expect(node.find(appG)).to.be.null;
    expect(node.find(appC)).not.to.be.null;
    expect(node.find(appC).value).to.eq(appC);
  });

  it('should remove leaf nodes', () => {
    const bstRootNode = new BinarySearchTreeNode();

    bstRootNode.insert(appB);
    bstRootNode.insert(appC);
    bstRootNode.insert(appA);

    expect(bstRootNode.toString()).to.eq('App A,App B,App C');

    const removed1 = bstRootNode.remove(appA);
    expect(bstRootNode.toString()).to.eq('App B,App C');
    expect(removed1).to.eq(true);

    const removed2 = bstRootNode.remove(appC);
    expect(bstRootNode.toString()).to.eq('App B');
    expect(removed2).to.eq(true);
  });

  it('should remove nodes with one child', () => {
    const bstRootNode = new BinarySearchTreeNode();

    bstRootNode.insert(appC);
    bstRootNode.insert(appD);
    bstRootNode.insert(appB);
    bstRootNode.insert(appE);

    expect(bstRootNode.toString()).to.eq('App B,App C,App D,App E');

    bstRootNode.remove(appD);
    expect(bstRootNode.toString()).to.eq('App B,App C,App E');

    bstRootNode.insert(appA);
    expect(bstRootNode.toString()).to.eq('App A,App B,App C,App E');

    bstRootNode.remove(appB);
    expect(bstRootNode.toString()).to.eq('App A,App C,App E');
  });

  it('should remove nodes with two children', () => {
    const bstRootNode = new BinarySearchTreeNode();

    bstRootNode.insert(appB);
    bstRootNode.insert(appD);
    bstRootNode.insert(appA);
    bstRootNode.insert(appG);
    bstRootNode.insert(appC);
    bstRootNode.insert(appF);

    expect(bstRootNode.toString()).to.eq('App A,App B,App C,App D,App F,App G');
    expect(bstRootNode.find(appD).left.value).to.eq(appC);
    expect(bstRootNode.find(appD).right.value).to.eq(appG);

    bstRootNode.remove(appD);
    expect(bstRootNode.toString()).to.eq('App A,App B,App C,App F,App G');

    bstRootNode.remove(appC);
    expect(bstRootNode.toString()).to.eq('App A,App B,App F,App G');

    bstRootNode.remove(appB);
    expect(bstRootNode.toString()).to.eq('App A,App F,App G');
    expect(bstRootNode.value).to.eq(appF);

    bstRootNode.remove(appF);
    expect(bstRootNode.toString()).to.eq('App A,App G');

    bstRootNode.remove(appA);
    expect(bstRootNode.toString()).to.eq('App G');
  });

  it('should remove node with no parent', () => {
    const bstRootNode = new BinarySearchTreeNode();
    expect(bstRootNode.toString()).to.eq('');

    bstRootNode.insert(appA);
    bstRootNode.insert(appB);
    expect(bstRootNode.toString()).to.eq('App A,App B');

    bstRootNode.remove(appA);
    expect(bstRootNode.toString()).to.eq('App B');

    bstRootNode.remove(appB);
    expect(bstRootNode.toString()).to.eq('');
  });

  it('should throw error when trying to remove not existing node', () => {
    const bstRootNode = new BinarySearchTreeNode();

    bstRootNode.insert(appA);
    bstRootNode.insert(appB);

    function removeNotExistingElementFromTree() {
      bstRootNode.remove(appC);
    }

    expect(removeNotExistingElementFromTree).to.throw();
  });

  it('should abandon removed node', () => {
    const rootNode = new BinarySearchTreeNode(appA);
    rootNode.insert(appB);
    const childNode = rootNode.find(appB);
    rootNode.remove(appB);

    expect(childNode.parent).to.be.null;
  });
});
