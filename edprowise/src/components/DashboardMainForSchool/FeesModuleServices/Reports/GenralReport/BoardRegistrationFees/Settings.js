import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, ListGroup, Row, Col } from 'react-bootstrap';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { toast } from 'react-toastify';
import { FaArrowRight, FaArrowLeft } from 'react-icons/fa';
import getAPI from '../../../../../../api/getAPI';
import putAPI from '../../../../../../api/putAPI';

const SettingsModal = ({ show, onHide, onSave, initialInFields }) => {
  const [schoolId, setSchoolId] = useState('');
  const [inFields, setInFields] = useState([]);
  const [outFields, setOutFields] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedInField, setSelectedInField] = useState(null);
  const [selectedOutField, setSelectedOutField] = useState(null);
  const [isDefaultDraggable, setIsDefaultDraggable] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [defaultFields, setDefaultFields] = useState([]);
  const [showSaveConfirmModal, setShowSaveConfirmModal] = useState(false); 

  useEffect(() => {
    try {
      const userDetails = JSON.parse(localStorage.getItem('userDetails'));
      if (!userDetails?.schoolId) {
        toast.error('School ID not found. Please log in again.');
        return;
      }
      setSchoolId(userDetails.schoolId);
    } catch (error) {
      console.error('SettingsModal: Error parsing userDetails:', error);
      toast.error('Invalid user details. Please log in again.');
    }
  }, []);

  const fetchInitialData = async () => {
    if (!schoolId) return;
    setIsLoading(true);
    try {
      const response = await getAPI(`/get-tab/${schoolId}/DailyCollection-BoardRegistration-Fees`, {}, true);
      if (response.hasError) {
        throw new Error(response.message || 'API error');
      }
      const fetchedData = response.data?.data;
      const fetchedInFields = fetchedData?.inFields || [];
      const fetchedOutFields = fetchedData?.outFields || [];
      setInFields(fetchedInFields);
      setOutFields(fetchedOutFields);
      setDefaultFields([...fetchedInFields, ...fetchedOutFields]);
    } catch (error) {
      console.error('SettingsModal: Error fetching Reports Tab Settings:', error);
      toast.error(`Failed to fetch settings: ${error.message}`);
      setInFields(initialInFields || []);
      setOutFields([]);
      setDefaultFields(initialInFields || []);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchInitialData();
  }, [schoolId, initialInFields]);

  const filteredOutFields = outFields.filter((field) =>
    field.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const onDragEnd = (result) => {
    const { source, destination } = result;
    if (!destination) return;

    let newInFields = [...inFields];
    let newOutFields = [...outFields];

    const sourceList = source.droppableId === 'in' ? newInFields : newOutFields;
    const destList = destination.droppableId === 'in' ? newInFields : newOutFields;

    const [movedItem] = sourceList.splice(source.index, 1);
    const updatedItem = {
      ...movedItem,
      isDefault: destination.droppableId === 'in' && isDefaultDraggable,
    };
    destList.splice(destination.index, 0, updatedItem);

    setInFields(newInFields);
    setOutFields(newOutFields);
    setSelectedInField(null);
    setSelectedOutField(null);
  };

  const handleMoveToOut = () => {
    if (selectedInField) {
      const newInFields = inFields.filter((f) => f.id !== selectedInField.id);
      const updatedField = { ...selectedInField, isDefault: false };
      const newOutFields = [...outFields, updatedField];
      setInFields(newInFields);
      setOutFields(newOutFields);
      setSelectedInField(null);
      toast.info(`${selectedInField.label} moved to Out list.`);
    }
  };

  const handleMoveToIn = () => {
    if (selectedOutField) {
      const newOutFields = outFields.filter((f) => f.id !== selectedOutField.id);
      const updatedField = { ...selectedOutField, isDefault: isDefaultDraggable };
      const newInFields = [...inFields, updatedField];
      setInFields(newInFields);
      setOutFields(newOutFields);
      setSelectedOutField(null);
      toast.info(`${selectedOutField.label} moved to In list.`);
    }
  };

  const handleToggleDefaultDraggable = () => {
    setIsDefaultDraggable(!isDefaultDraggable);
    toast.info(`Default fields are now ${!isDefaultDraggable ? 'draggable' : 'non-draggable'}.`);
  };

  const handleReset = () => {
    const allFields = [...defaultFields];
    const newInFields = allFields.filter((field) => field.isDefault);
    const newOutFields = allFields.filter((field) => !field.isDefault);

    setInFields(newInFields);
    setOutFields(newOutFields);
    setSearchTerm('');
    setSelectedInField(null);
    setSelectedOutField(null);
    setIsDefaultDraggable(false);
    toast.info('Fields reset: all fields moved to Out, default fields moved to In.');
  };

  const handleSave = async () => {
    if (isDefaultDraggable) {
      setShowSaveConfirmModal(true); 
      return;
    }
    await performSave(); 
  };

  const confirmSaveAndDisableDraggable = async () => {
    setIsDefaultDraggable(false);
    setShowSaveConfirmModal(false); 
    toast.info('Default fields have been successfully updated.');
    await performSave(); 
  };

  const performSave = async () => {
    try {
      const response = await putAPI(
        '/update-tab-settings',
        {
          schoolId,
          tabType: 'DailyCollection-BoardRegistration-Fees',
          inFields,
          outFields,
        },
        true
      );

      if (response.data.hasError) {
        throw new Error(response.data.message || 'Failed to update settings');
      }

      setDefaultFields([...inFields, ...outFields]);
      onSave(inFields);
      onHide();
      await fetchInitialData(); 
      toast.success('Table columns updated successfully.');
    } catch (error) {
      console.error('SettingsModal: Error saving settings:', error);
      toast.error(`Failed to save settings: ${error.message}`);
    }
  };

  return (
    <>
      <Modal show={show} onHide={onHide} size="lg" centered scrollable dialogClassName="responsive-modal">
        <Modal.Header closeButton>
          <Modal.Title>Table Settings</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {isLoading ? (
            <div>Loading settings...</div>
          ) : (
            <>
              <div className="d-flex flex-wrap gap-2 mb-3 align-items-center">
                <Form.Group style={{ flex: '1 1 200px' }}>
                  <Form.Control
                    type="text"
                    placeholder="Search fields (Out list only)..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </Form.Group>
              </div>
              <DragDropContext onDragEnd={onDragEnd}>
                <Row className="gy-3 align-items-center">
                  <Col xs={12} md={5}>
                    <h5>In (Displayed in Table)</h5>
                    <Droppable droppableId="in">
                      {(provided) => (
                        <ListGroup
                          {...provided.droppableProps}
                          ref={provided.innerRef}
                          style={{
                            backgroundColor: '#f8f9fa',
                            borderRadius: '4px',
                            minHeight: '200px',
                            maxHeight: '400px',
                            overflowY: 'auto',
                            border: '1px solid #ccc',
                            padding: '10px',
                            touchAction: 'manipulation',
                          }}
                        >
                          {inFields.length > 0 ? (
                            inFields.map((field, index) => (
                              <Draggable
                                key={field.id}
                                draggableId={String(field.id)}
                                index={index}
                                isDragDisabled={field.isDefault && !isDefaultDraggable}
                              >
                                {(provided) => (
                                  <ListGroup.Item
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    style={{
                                      ...provided.draggableProps.style,
                                      marginBottom: '5px',
                                      padding: '10px',
                                      backgroundColor: selectedInField?.id === field.id ? '#e9ecef' : '#fff',
                                      border: '1px solid #ddd',
                                      borderRadius: '4px',
                                      cursor: field.isDefault && !isDefaultDraggable ? 'not-allowed' : 'grab',
                                      userSelect: 'none',
                                    }}
                                    onClick={() => {
                                      setSelectedInField(field);
                                      setSelectedOutField(null);
                                    }}
                                  >
                                    {field.label}
                                  </ListGroup.Item>
                                )}
                              </Draggable>
                            ))
                          ) : (
                            <ListGroup.Item>No fields available in the In list. Please check settings.</ListGroup.Item>
                          )}
                          {provided.placeholder}
                        </ListGroup>
                      )}
                    </Droppable>
                  </Col>
                  <Col xs={12} md={2} className="d-flex justify-content-center align-items-center">
                    <div className="d-flex flex-column gap-2">
                      <Button variant="warning" onClick={handleReset}>
                        Reset
                      </Button>
                      <Button variant="outline-secondary" onClick={handleToggleDefaultDraggable}>
                        {isDefaultDraggable ? 'Disable Default' : 'Make Default'}
                      </Button>
                      <Button
                        variant="outline-primary"
                        onClick={handleMoveToOut}
                        disabled={!selectedInField}
                        title="Move to Out"
                      >
                        <FaArrowRight />
                      </Button>
                      <Button
                        variant="outline-primary"
                        onClick={handleMoveToIn}
                        disabled={!selectedOutField}
                        title="Move to In"
                      >
                        <FaArrowLeft />
                      </Button>
                    </div>
                  </Col>
                  <Col xs={12} md={5}>
                    <h5>Out (Not Displayed)</h5>
                    <Droppable droppableId="out">
                      {(provided) => (
                        <ListGroup
                          {...provided.droppableProps}
                          ref={provided.innerRef}
                          style={{
                            backgroundColor: '#f8f9fa',
                            borderRadius: '4px',
                            minHeight: '200px',
                            maxHeight: '400px',
                            overflowY: 'auto',
                            border: '1px solid #ccc',
                            padding: '10px',
                            touchAction: 'manipulation',
                          }}
                        >
                          {filteredOutFields.length > 0 ? (
                            filteredOutFields.map((field, index) => (
                              <Draggable key={field.id} draggableId={String(field.id)} index={index}>
                                {(provided) => (
                                  <ListGroup.Item
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    style={{
                                      ...provided.draggableProps.style,
                                      marginBottom: '5px',
                                      padding: '10px',
                                      backgroundColor: selectedOutField?.id === field.id ? '#e9ecef' : '#fff',
                                      border: '1px solid #ddd',
                                      borderRadius: '4px',
                                      cursor: 'grab',
                                      userSelect: 'none',
                                    }}
                                    onClick={() => {
                                      setSelectedOutField(field);
                                      setSelectedInField(null);
                                    }}
                                  >
                                    {field.label}
                                  </ListGroup.Item>
                                )}
                              </Draggable>
                            ))
                          ) : (
                            <ListGroup.Item>No fields available in the Out list or no matches for search.</ListGroup.Item>
                          )}
                          {provided.placeholder}
                        </ListGroup>
                      )}
                    </Droppable>
                  </Col>
                </Row>
              </DragDropContext>
            </>
          )}
        </Modal.Body>
        <Modal.Footer className="d-flex flex-wrap gap-2 justify-content-end">
          <Button variant="secondary" onClick={onHide}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSave} disabled={isLoading}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={showSaveConfirmModal} onHide={() => setShowSaveConfirmModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Save</Modal.Title>
        </Modal.Header>
        <Modal.Body>
         Changing default fields may affect system behavior. Are you sure you want to proceed?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowSaveConfirmModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={confirmSaveAndDisableDraggable}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default SettingsModal;