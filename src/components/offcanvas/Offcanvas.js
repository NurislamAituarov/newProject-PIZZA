import { Button, Offcanvas } from 'react-bootstrap';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { offcanvas } from '../../action/action';

function Example() {
  const show = useSelector((state) => state.showOffcanvas);
  const dispatch = useDispatch();
  const handleClose = () => dispatch(offcanvas());

  return (
    <>
      <Offcanvas show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Pizza</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          Some text as placeholder. In real life you can have the elements you have chosen. Like,
          text, images, lists, etc.
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}
export default Example;
