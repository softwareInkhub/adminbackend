import * as React from 'react';
import { useEffect, useState } from 'react';
import styled from 'styled-components/dist/styled-components.browser.esm.js';
const SchemaManager = () => {
    const [schemas, setSchemas] = useState([]);
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        status: 'DRAFT',
        tags: '',
        fields: [{ name: '', type: 'string', required: false }]
    });
    const [message, setMessage] = useState({ text: '', isError: false });
    useEffect(() => {
        loadSchemas();
    }, []);
    const loadSchemas = async () => {
        try {
            const response = await fetch('/api/schemas');
            const data = await response.json();
            setSchemas(data);
        }
        catch (error) {
            showMessage('Error loading schemas', true);
        }
    };
    const showMessage = (text, isError) => {
        setMessage({ text, isError });
        setTimeout(() => setMessage({ text: '', isError: false }), 3000);
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = {
                ...formData,
                tags: formData.tags ? formData.tags.split(',').map(tag => tag.trim()) : []
            };
            const response = await fetch('/api/schemas', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
            if (!response.ok)
                throw new Error('Failed to create schema');
            showMessage('Schema created successfully', false);
            setFormData({
                name: '',
                description: '',
                status: 'DRAFT',
                tags: '',
                fields: [{ name: '', type: 'string', required: false }]
            });
            loadSchemas();
        }
        catch (error) {
            showMessage('Error creating schema', true);
        }
    };
    const deleteSchema = async (id) => {
        if (!window.confirm('Are you sure you want to delete this schema?'))
            return;
        try {
            const response = await fetch(`/api/schemas/${id}`, { method: 'DELETE' });
            if (!response.ok)
                throw new Error('Failed to delete schema');
            showMessage('Schema deleted successfully', false);
            loadSchemas();
        }
        catch (error) {
            showMessage('Error deleting schema', true);
        }
    };
    const addField = () => {
        setFormData(prev => ({
            ...prev,
            fields: [...prev.fields, { name: '', type: 'string', required: false }]
        }));
    };
    const removeField = (index) => {
        setFormData(prev => ({
            ...prev,
            fields: prev.fields.filter((_, i) => i !== index)
        }));
    };
    const updateField = (index, field) => {
        setFormData(prev => ({
            ...prev,
            fields: prev.fields.map((f, i) => i === index ? { ...f, ...field } : f)
        }));
    };
    const formatDate = (timestamp) => {
        if (!timestamp)
            return '-';
        return new Date(timestamp.seconds * 1000).toLocaleString();
    };
    return (React.createElement(Container, null,
        React.createElement("h1", null, "Schema Management"),
        React.createElement(Section, null,
            React.createElement("h2", null, "Schemas"),
            React.createElement(Table, null,
                React.createElement("thead", null,
                    React.createElement("tr", null,
                        React.createElement("th", null, "Name"),
                        React.createElement("th", null, "Description"),
                        React.createElement("th", null, "Status"),
                        React.createElement("th", null, "Fields"),
                        React.createElement("th", null, "Tags"),
                        React.createElement("th", null, "Created"),
                        React.createElement("th", null, "Actions"))),
                React.createElement("tbody", null, schemas.map(schema => (React.createElement("tr", { key: schema.id },
                    React.createElement("td", null, schema.name),
                    React.createElement("td", null, schema.description || '-'),
                    React.createElement("td", null, schema.status),
                    React.createElement("td", null,
                        React.createElement(Pre, null, JSON.stringify(schema.fields, null, 2))),
                    React.createElement("td", null, schema.tags?.map(tag => (React.createElement(Tag, { key: tag }, tag))) || '-'),
                    React.createElement("td", null, formatDate(schema.createdTime || schema.createdAt)),
                    React.createElement("td", null,
                        React.createElement(Button, { onClick: () => { } }, "Edit"),
                        React.createElement(DeleteButton, { onClick: () => deleteSchema(schema.id) }, "Delete")))))))),
        React.createElement(Section, null,
            React.createElement("h2", null, "Create New Schema"),
            React.createElement(Form, { onSubmit: handleSubmit },
                React.createElement(FormGroup, null,
                    React.createElement("label", null, "Name:"),
                    React.createElement("input", { type: "text", value: formData.name, onChange: e => setFormData(prev => ({ ...prev, name: e.target.value })), required: true })),
                React.createElement(FormGroup, null,
                    React.createElement("label", null, "Description:"),
                    React.createElement("input", { type: "text", value: formData.description, onChange: e => setFormData(prev => ({ ...prev, description: e.target.value })) })),
                React.createElement(FormGroup, null,
                    React.createElement("label", null, "Status:"),
                    React.createElement("select", { value: formData.status, onChange: e => setFormData(prev => ({ ...prev, status: e.target.value })), required: true },
                        React.createElement("option", { value: "DRAFT" }, "Draft"),
                        React.createElement("option", { value: "ACTIVE" }, "Active"),
                        React.createElement("option", { value: "INACTIVE" }, "Inactive"))),
                React.createElement(FormGroup, null,
                    React.createElement("label", null, "Tags (comma separated):"),
                    React.createElement("input", { type: "text", value: formData.tags, onChange: e => setFormData(prev => ({ ...prev, tags: e.target.value })) })),
                React.createElement(FieldsContainer, null,
                    React.createElement("h3", null, "Fields"),
                    formData.fields.map((field, index) => (React.createElement(FieldContainer, { key: index },
                        React.createElement(FormGroup, null,
                            React.createElement("label", null, "Name:"),
                            React.createElement("input", { type: "text", value: field.name, onChange: e => updateField(index, { name: e.target.value }), required: true })),
                        React.createElement(FormGroup, null,
                            React.createElement("label", null, "Type:"),
                            React.createElement("select", { value: field.type, onChange: e => updateField(index, { type: e.target.value }), required: true },
                                React.createElement("option", { value: "string" }, "String"),
                                React.createElement("option", { value: "number" }, "Number"),
                                React.createElement("option", { value: "boolean" }, "Boolean"),
                                React.createElement("option", { value: "date" }, "Date"),
                                React.createElement("option", { value: "array" }, "Array"),
                                React.createElement("option", { value: "object" }, "Object"),
                                React.createElement("option", { value: "enum" }, "Enum"))),
                        React.createElement(FormGroup, null,
                            React.createElement("label", null,
                                React.createElement("input", { type: "checkbox", checked: field.required, onChange: e => updateField(index, { required: e.target.checked }) }),
                                "Required")),
                        React.createElement(DeleteButton, { type: "button", onClick: () => removeField(index) }, "Remove")))),
                    React.createElement(Button, { type: "button", onClick: addField }, "Add Field")),
                React.createElement(Button, { type: "submit" }, "Create Schema")),
            message.text && (React.createElement(Message, { isError: message.isError }, message.text)))));
};
// Styled Components
const Container = styled.div `
  max-width: 1200px;
  margin: 20px auto;
  padding: 0 20px;
  font-family: Arial, sans-serif;
`;
const Section = styled.div `
  margin-bottom: 30px;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 4px;
`;
const Table = styled.table `
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;

  th, td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: left;
  }

  th {
    background-color: #f2f2f2;
  }
`;
const Pre = styled.pre `
  max-height: 150px;
  overflow-y: auto;
  white-space: pre-wrap;
  margin: 0;
  font-size: 12px;
`;
const Tag = styled.span `
  display: inline-block;
  background: #e0e0e0;
  padding: 2px 8px;
  border-radius: 12px;
  margin: 2px;
  font-size: 12px;
`;
const Form = styled.form `
  display: flex;
  flex-direction: column;
  gap: 15px;
`;
const FormGroup = styled.div `
  display: flex;
  flex-direction: column;
  gap: 5px;

  input, select {
    padding: 8px;
    border: 1px solid #ddd;
    border-radius: 4px;
  }
`;
const FieldsContainer = styled.div `
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
const FieldContainer = styled.div `
  border: 1px solid #ddd;
  padding: 15px;
  border-radius: 4px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr auto;
  gap: 10px;
`;
const Button = styled.button `
  padding: 8px 12px;
  background: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background: #0056b3;
  }
`;
const DeleteButton = styled(Button) `
  background: #dc3545;

  &:hover {
    background: #c82333;
  }
`;
const Message = styled.div `
  margin-top: 10px;
  padding: 10px;
  border-radius: 4px;
  background: ${(props) => props.isError ? '#f8d7da' : '#d4edda'};
  color: ${(props) => props.isError ? '#721c24' : '#155724'};
`;
export default SchemaManager;
