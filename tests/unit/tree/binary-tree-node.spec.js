/// <reference types="Cypress" />

import BinaryTreeNode from '../../../src/domain/tree/binary-tree-node';
import AppModel from '../../../src/domain/app.model';

describe('BinaryTreeNode', () => {
  const appA = new AppModel('App A', ['Some Guy'], 7, 63, ['domainA']);

  const appB = new AppModel('App B', ['Some Guy'], 7, 64, ['domainA']);

  const appC = new AppModel('App C', ['Some Guy'], 7, 65, ['domainA']);

  const appD = new AppModel('App D', ['Another Guy'], 7, 70, ['domainA']);

  const appE = new AppModel('App E', ['Another Guy'], 7, 70, ['domainA']);

  const appF = new AppModel('App F', ['Another Guy'], 7, 80, ['domainA']);

  const appG = new AppModel('App G', ['Another Guy'], 7, 90, ['domainA']);

  it('should create node', () => {
    const node = new BinaryTreeNode();

    expect(node).to.exist;

    expect(node.value).to.be.null;
    expect(node.left).to.be.null;
    expect(node.right).to.be.null;

    const leftNode = new BinaryTreeNode(appA);
    const rightNode = new BinaryTreeNode(appC);
    const rootNode = new BinaryTreeNode(appB);

    rootNode.setLeft(leftNode).setRight(rightNode);

    expect(rootNode.value).to.eq(appB);
    expect(rootNode.left.value).to.eq(appA);
    expect(rootNode.right.value).to.eq(appC);
  });

  it('should set parent', () => {
    const leftNode = new BinaryTreeNode(appA);
    const rightNode = new BinaryTreeNode(appC);
    const rootNode = new BinaryTreeNode(appB);

    rootNode.setLeft(leftNode).setRight(rightNode);

    expect(rootNode.parent).to.be.null;
    expect(rootNode.left.parent.value).to.eq(appB);
    expect(rootNode.right.parent.value).to.eq(appB);
    expect(rootNode.right.parent).to.eq(rootNode);
  });

  it('should traverse node', () => {
    const leftNode = new BinaryTreeNode(appA);
    const rightNode = new BinaryTreeNode(appC);
    const rootNode = new BinaryTreeNode(appB);

    rootNode.setLeft(leftNode).setRight(rightNode);

    assert.notStrictEqual(rootNode.traverseInOrder(), [appA, appB, appC]);
    expect(rootNode.toString()).to.eq('App A,App B,App C');
  });

  it('should remove child node', () => {
    const leftNode = new BinaryTreeNode(appA);
    const rightNode = new BinaryTreeNode(appC);
    const rootNode = new BinaryTreeNode(appB);

    rootNode.setLeft(leftNode).setRight(rightNode);
    assert.notStrictEqual(rootNode.traverseInOrder(), [appA, appB, appC]);

    expect(rootNode.removeChild(rootNode.left)).to.be.true;
    assert.notStrictEqual(rootNode.traverseInOrder(), [appB, appA]);

    expect(rootNode.removeChild(rootNode.right)).to.be.true;
    assert.notStrictEqual(rootNode.traverseInOrder(), [appB]);

    expect(rootNode.removeChild(rootNode.right)).to.be.false;
    assert.notStrictEqual(rootNode.traverseInOrder(), [appB, appA]);
  });

  it('should replace child node', () => {
    const leftNode = new BinaryTreeNode(appA);
    const rightNode = new BinaryTreeNode(appC);
    const rootNode = new BinaryTreeNode(appB);

    rootNode.setLeft(leftNode).setRight(rightNode);
    assert.notStrictEqual(rootNode.traverseInOrder(), [appA, appB, appC]);

    const replacementNode = new BinaryTreeNode(appE);
    rightNode.setRight(replacementNode);

    assert.notStrictEqual(rootNode.traverseInOrder(), [appA, appB, appC, appE]);

    expect(rootNode.replaceChild(rootNode.right, rootNode.right.right)).to.be.true;
    expect(rootNode.right.value).to.eq(appE);
    expect(rootNode.right.right).to.be.null;
    assert.notStrictEqual(rootNode.traverseInOrder(), [appA, appB, appD]);

    expect(rootNode.replaceChild(rootNode.right, rootNode.right.right)).to.be.false;
    assert.notStrictEqual(rootNode.traverseInOrder(), [appA, appB, appE]);

    expect(rootNode.replaceChild(rootNode.right, replacementNode)).to.be.true;
    assert.notStrictEqual(rootNode.traverseInOrder(), [appA, appB, appE]);

    expect(rootNode.replaceChild(rootNode.left, replacementNode)).to.be.true;
    assert.notStrictEqual(rootNode.traverseInOrder(), [appE, appB, appE]);

    expect(rootNode.replaceChild(new BinaryTreeNode(), new BinaryTreeNode())).to.be.false;
  });

  it('should calculate node height', () => {
    const root = new BinaryTreeNode(appE);
    const left = new BinaryTreeNode(appC);
    const right = new BinaryTreeNode(appF);
    const grandLeft = new BinaryTreeNode(appB);
    const grandRight = new BinaryTreeNode(appD);
    const grandGrandLeft = new BinaryTreeNode(appA);

    expect(root.height).to.eq(0);
    expect(root.balanceFactor).to.eq(0);

    root.setLeft(left).setRight(right);

    expect(root.height).to.eq(1);
    expect(left.height).to.eq(0);
    expect(root.balanceFactor).to.eq(0);

    left.setLeft(grandLeft).setRight(grandRight);

    expect(root.height).to.eq(2);
    expect(left.height).to.eq(1);
    expect(grandLeft.height).to.eq(0);
    expect(grandRight.height).to.eq(0);
    expect(root.balanceFactor).to.eq(1);

    grandLeft.setLeft(grandGrandLeft);

    expect(root.height).to.eq(3);
    expect(left.height).to.eq(2);
    expect(grandLeft.height).to.eq(1);
    expect(grandRight.height).to.eq(0);
    expect(grandGrandLeft.height).to.eq(0);
    expect(root.balanceFactor).to.eq(2);
  });

  it('should calculate node height for right nodes as well', () => {
    const root = new BinaryTreeNode(appA);
    const right = new BinaryTreeNode(appB);

    root.setRight(right);

    expect(root.height).to.eq(1);
    expect(right.height).to.eq(0);
    expect(root.balanceFactor).to.eq(-1);
  });

  it('should set null for left and right node', () => {
    const root = new BinaryTreeNode(appB);
    const left = new BinaryTreeNode(appA);
    const right = new BinaryTreeNode(appC);

    root.setLeft(left);
    root.setRight(right);

    expect(root.left.value).to.eq(appA);
    expect(root.right.value).to.eq(appC);

    root.setLeft(null);
    root.setRight(null);

    expect(root.left).to.be.null;
    expect(root.right).to.be.null;
  });

  it('should detect right uncle', () => {
    const grandParent = new BinaryTreeNode(appC);
    const parent = new BinaryTreeNode(appB);
    const uncle = new BinaryTreeNode(appD);
    const child = new BinaryTreeNode(appA);

    expect(grandParent.uncle).to.not.exist;
    expect(parent.uncle).to.not.exist;

    grandParent.setLeft(parent);

    expect(parent.uncle).to.not.exist;
    expect(child.uncle).to.not.exist;

    parent.setLeft(child);

    expect(child.uncle).to.not.exist;

    grandParent.setRight(uncle);

    expect(parent.uncle).to.not.exist;
    expect(child.uncle).to.exist;
    expect(child.uncle).to.eq(uncle);
  });

  it('should detect left uncle', () => {
    const grandParent = new BinaryTreeNode(appB);
    const parent = new BinaryTreeNode(appC);
    const uncle = new BinaryTreeNode(appA);
    const child = new BinaryTreeNode(appD);

    expect(grandParent.uncle).to.not.exist;
    expect(parent.uncle).to.not.exist;

    grandParent.setRight(parent);

    expect(parent.uncle).to.not.exist;
    expect(child.uncle).to.not.exist;

    parent.setRight(child);

    expect(child.uncle).to.not.exist;

    grandParent.setLeft(uncle);

    expect(parent.uncle).to.not.exist;
    expect(child.uncle).to.exist;
    expect(child.uncle).to.eq(uncle);
  });

  it('should be possible to set node values', () => {
    const node = new BinaryTreeNode(appA);

    expect(node.value).to.eq(appA);

    node.setValue(appB);

    expect(node.value).to.eq(appB);
  });

  it('should be possible to copy node', () => {
    const root = new BinaryTreeNode(appB);
    const left = new BinaryTreeNode(appA);
    const right = new BinaryTreeNode(appC);

    root.setLeft(left).setRight(right);

    expect(root.toString()).to.eq('App A,App B,App C');

    const newRoot = new BinaryTreeNode(appF);
    const newLeft = new BinaryTreeNode(appE);
    const newRight = new BinaryTreeNode(appG);

    newRoot.setLeft(newLeft).setRight(newRight);

    expect(newRoot.toString()).to.eq('App E,App F,App G');

    BinaryTreeNode.copyNode(root, newRoot);

    expect(root.toString()).to.eq('App A,App B,App C');
    expect(newRoot.toString()).to.eq('App A,App B,App C');
  });
});
