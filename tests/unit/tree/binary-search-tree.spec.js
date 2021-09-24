/// <reference types="Cypress" />

import BinarySearchTree from '../../../src/domain/tree/binary-search-tree';
import AppModel from '../../../src/domain/app.model';

describe('BinarySearchTree', () => {
  const appA = new AppModel('App A', ['Some Guy'], 7, 63, ['domainA']);

  const appB = new AppModel('App B', ['Some Guy'], 7, 64, ['domainA']);

  const appC = new AppModel('App C', ['Some Guy'], 7, 65, ['domainA']);

  const appD = new AppModel('App D', ['Another Guy'], 7, 70, ['domainA']);

  const appE = new AppModel('App E', ['Another Guy'], 7, 70, ['domainA']);

  const appF = new AppModel('App F', ['Another Guy'], 7, 80, ['domainA']);

  const appG = new AppModel('App G', ['Another Guy'], 7, 90, ['domainA']);

  it('should create binary search tree', () => {
    const bst = new BinarySearchTree();

    expect(bst).to.exist;
    expect(bst.root).to.exist;
    expect(bst.root.value).to.be.null;
    expect(bst.root.left).to.be.null;
    expect(bst.root.right).to.be.null;
  });

  it('should insert values', () => {
    const bst = new BinarySearchTree();

    const insertedNode1 = bst.insert(appA);
    const insertedNode2 = bst.insert(appB);
    bst.insert(appC);

    expect(bst.toString()).to.eq('App A,App B,App C');
    expect(insertedNode1.value).to.eq(appA);
    expect(insertedNode2.value).to.eq(appB);
  });

  it('should check if value exists', () => {
    const bst = new BinarySearchTree();

    bst.insert(appB);
    bst.insert(appC);
    bst.insert(appA);

    expect(bst.contains(appC)).to.be.true;
    expect(bst.contains(appD)).to.be.false;
  });

  it('should remove nodes', () => {
    const bst = new BinarySearchTree();

    bst.insert(appB);
    bst.insert(appC);
    bst.insert(appA);

    expect(bst.toString()).to.eq('App A,App B,App C');

    const removed1 = bst.remove(appA);
    expect(bst.toString()).to.eq('App B,App C');
    expect(removed1).to.be.true;

    const removed2 = bst.remove(appC);
    expect(bst.toString()).to.eq('App B');
    expect(removed2).to.be.true;
  });

  it('should be traversed to sorted array', () => {
    const bst = new BinarySearchTree();

    bst.insert(appE);
    bst.insert(appB);
    bst.insert(appF);
    bst.insert(appA);
    bst.insert(appG);
    bst.insert(appD);

    expect(bst.toString()).to.eq('App A,App B,App D,App E,App F,App G');
    expect(bst.root.height).to.eq(2);

    bst.insert(appC);

    expect(bst.toString()).to.eq('App A,App B,App C,App D,App E,App F,App G');
    expect(bst.root.height).to.eq(3);
  });
});
