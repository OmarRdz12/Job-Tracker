
import React, { useState, useEffect } from 'react';
import { Reference, Company, FormDataReference } from '../../types';
import Modal from '../ui/Modal';
import Input from '../ui/Input';
import Textarea from '../ui/Textarea';
import Select from '../ui/Select';
import Button from '../ui/Button';

interface ReferenceFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (reference: Reference) => void;
  initialData?: Reference | null;
  companies: Company[];
}

const ReferenceForm: React.FC<ReferenceFormProps> = ({ isOpen, onClose, onSubmit, initialData, companies }) => {
  // Fix: Corrected variable name from const_initial_form_data to _initial_form_data
  const _initial_form_data: FormDataReference = {
    name: '',
    contactInfo: '',
    relationship: '',
    companyId: '',
    notes: '',
  };
  
  const [formData, setFormData] = useState<FormDataReference>(_initial_form_data);

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    } else {
      // Fix: Use the correctly named _initial_form_data variable
      setFormData(_initial_form_data);
    }
  }, [initialData, isOpen]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.companyId) {
        alert("Please select a company for this reference."); // Simple validation
        return;
    }
    onSubmit({
      ...formData,
      id: initialData?.id || crypto.randomUUID(),
    });
    onClose();
  };

  const companyOptions = companies.map(c => ({ value: c.id, label: c.name }));
  
  const modalFooter = (
    <div className="flex justify-end space-x-3">
      <Button variant="ghost" onClick={onClose}>Cancel</Button>
      <Button type="submit" form="reference-form">
        {initialData ? 'Save Changes' : 'Add Reference'}
      </Button>
    </div>
  );

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={initialData ? 'Edit Reference' : 'Add New Reference'} footer={modalFooter}>
      <form id="reference-form" onSubmit={handleSubmit} className="space-y-4">
        <Input label="Reference Name" name="name" value={formData.name} onChange={handleChange} required />
        <Input label="Contact Info (Email/Phone)" name="contactInfo" value={formData.contactInfo} onChange={handleChange} required />
        <Input label="Relationship" name="relationship" value={formData.relationship} onChange={handleChange} placeholder="e.g., Former Manager, Colleague" required />
        <Select label="Associated Company" name="companyId" value={formData.companyId} onChange={handleChange} options={companyOptions} required />
        <Textarea label="Notes" name="notes" value={formData.notes || ''} onChange={handleChange} />
      </form>
    </Modal>
  );
};

export default ReferenceForm;