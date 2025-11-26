import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, ListGroup, Row, Col } from 'react-bootstrap';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { toast } from 'react-toastify';
import { FaArrowRight, FaArrowLeft } from 'react-icons/fa';
import getAPI from '../../../../../../api/getAPI';
import putAPI from '../../../../../../api/putAPI'

const SettingsModal = ({ show, onHide, onSave, initialInFields }) => {
  const [schoolId, setSchoolId] = useState('');
  const [inFields, setInFields] = useState(initialInFields || []);
  const [outFields, setOutFields] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedInField, setSelectedInField] = useState(null);
  const [selectedOutField, setSelectedOutField] = useState(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [isDefaultDraggable, setIsDefaultDraggable] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    try {
      const userDetails = JSON.parse(localStorage.getItem('userDetails'));
      console.log('SettingsModal: userDetails:', userDetails);
      if (!userDetails?.schoolId) {
        toast.error('School ID not found. Please log in again.');
        return;
      }
      setSchoolId(userDetails.schoolId);
      console.log('SettingsModal: schoolId set to:', userDetails.schoolId);
    } catch (error) {
      console.error('SettingsModal: Error parsing userDetails:', error);
      toast.error('Invalid user details. Please log in again.');
    }
  }, []);

  useEffect(() => {
    if (!schoolId) {
      console.log('SettingsModal: No schoolId, skipping fetch');
      return;
    }
    console.log('SettingsModal: Fetching data for schoolId:', schoolId, 'initialInFields:', initialInFields);
    const fetchInitialData = async () => {
      setIsLoading(true);
      try {
        const response = await getAPI(`/get-tab/${schoolId}/student-ledger`, {}, true);
        console.log('SettingsModal: API response:', response);
        if (response.hasError) {
          throw new Error(response.message || 'API error');
        }
        const fetchedData = response.data?.data;
        const fetchedInFields = fetchedData?.inFields || [];
        const newInFields = (initialInFields?.length > 0
          ? initialInFields
          : fetchedInFields
        ).filter((field) => field.isDefault === true);
        const newOutFields = fetchedInFields.filter((field) => field.isDefault === false);
        console.log('SettingsModal: Setting inFields:', newInFields, 'outFields:', newOutFields);
        setInFields(newInFields);
        setOutFields(newOutFields);
      } catch (error) {
        console.error('SettingsModal: Error fetching Reports Tab Settings:', error);
        toast.error(`Failed to fetch settings: ${error.message}`);
        const fallbackInFields = (initialInFields || []).filter((field) => field.isDefault === true);
        console.log('SettingsModal: Fallback inFields:', fallbackInFields);
        setInFields(fallbackInFields);
        setOutFields([]);
      } finally {
        setIsLoading(false);
      }
    };
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
    destList.splice(destination.index, 0, movedItem);

    setInFields(newInFields);
    setOutFields(newOutFields);
    setSelectedInField(null);
    setSelectedOutField(null);
  };

  const handleMoveToOut = () => {
    if (selectedInField) {
      const newInFields = inFields.filter((f) => f.id !== selectedInField.id);
      const newOutFields = [...outFields, selectedInField];
      setInFields(newInFields);
      setOutFields(newOutFields);
      setSelectedInField(null);
      toast.info(`${selectedInField.label} moved to Out list.`);
    }
  };

  const handleMoveToIn = () => {
    if (selectedOutField) {
      const newOutFields = outFields.filter((f) => f.id !== selectedOutField.id);
      const newInFields = [...inFields, selectedOutField];
      setInFields(newInFields);
      setOutFields(newOutFields);
      setSelectedOutField(null);
      toast.info(`${selectedOutField.label} moved to In list.`);
    }
  };

  const handleToggleDefaultDraggable = () => {
    setShowConfirmModal(true);
  };

  const confirmToggleDefaultDraggable = () => {
    setIsDefaultDraggable(!isDefaultDraggable);
    setShowConfirmModal(false);
    toast.info(`Default fields are now ${isDefaultDraggable ? 'draggable' : 'non-draggable'}.`);
  };

  const handleReset = () => {
    const allFields = [...inFields, ...outFields];
    if (allFields.length > 0) {
      const newInFields = allFields.filter((field) => field.isDefault === true);
      const newOutFields = allFields.filter((field) => field.isDefault === false);
      console.log('SettingsModal: Reset inFields:', newInFields, 'outFields:', newOutFields);
      setInFields(newInFields);
      setOutFields(newOutFields);
    } else {
      const fallbackInFields = (initialInFields || []).filter((field) => field.isDefault === true);
      const fallbackOutFields = (initialInFields || []).filter((field) => field.isDefault === false);
      console.log('SettingsModal: Reset fallback inFields:', fallbackInFields, 'outFields:', fallbackOutFields);
      setInFields(fallbackInFields);
      setOutFields(fallbackOutFields);
    }
    setSearchTerm('');
    setSelectedInField(null);
    setSelectedOutField(null);
    setIsDefaultDraggable(false);
    toast.info('Fields and search reset to default.');
  };

  const handleSave = async () => {
    try {
      console.log('SettingsModal: Saving inFields:', inFields, 'outFields:', outFields);
      const updatedFields = [
        ...inFields.map((field) => ({ ...field, isDefault: true })),
        ...outFields.map((field) => ({ ...field, isDefault: false })),
      ];
      console.log('SettingsModal: Sending updatedFields to API:', updatedFields);

      const response = await putAPI(
        '/update-tab-settings', 
        {
          schoolId: 'SID965162',
          tabType: 'student-ledger',
          inFields: updatedFields,
        },
       true
      );

      console.log('SettingsModal: Update API response:', response.data);
      if (response.data.hasError) {
        throw new Error(response.data.message || 'Failed to update settings');
      }
      setInFields(inFields);
      setOutFields(outFields);
      onSave(inFields); 
      onHide();
      toast.success('Table columns updated successfully.');
    } catch (error) {
      console.error('SettingsModal: Error saving settings:', error);
      toast.error(`Failed to save settings: ${error.message}`);
    }
  };

  console.log('SettingsModal: Rendering with inFields.length:', inFields.length, 'outFields.length:', outFields.length);

  return (
    <>
      <Modal
        show={show}
        onHide={onHide}
        size="lg"
        centered
        scrollable
        dialogClassName="responsive-modal"
      >
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
                                      backgroundColor:
                                        selectedInField?.id === field.id ? '#e9ecef' : '#fff',
                                      border: '1px solid #ddd',
                                      borderRadius: '4px',
                                      cursor:
                                        field.isDefault && !isDefaultDraggable
                                          ? 'not-allowed'
                                          : 'grab',
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
                      <Button
                        variant="outline-secondary"
                        onClick={handleToggleDefaultDraggable}
                      >
                        {isDefaultDraggable ? 'Disable Default Drag' : 'Enable Default Drag'}
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
                              <Draggable
                                key={field.id}
                                draggableId={String(field.id)}
                                index={index}
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
                                      backgroundColor:
                                        selectedOutField?.id === field.id ? '#e9ecef' : '#fff',
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
      <Modal
        show={showConfirmModal}
        onHide={() => setShowConfirmModal(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Confirm Action</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to {isDefaultDraggable ? 'disable' : 'enable'} dragging for default fields?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowConfirmModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={confirmToggleDefaultDraggable}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default SettingsModal;