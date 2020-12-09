import React from 'react';
import { Modal, Form, Row, Col, Input, Upload, Checkbox, Button } from 'antd';
import { PlusOutlined, LoadingOutlined } from '@ant-design/icons';
import { PaymentPage } from '../../interfaces';

interface FormModalProps {
  showFormModal: boolean;
  onToggleFormModal(): void;
  beforeUpload(file: File): boolean;
  onChange(info: any): void;
  imageUrl: any;
  uploadButton: React.ReactNode;
  values: PaymentPage;
  onSubmit(values: PaymentPage): void;
  isSubmit: boolean;
  isAmount: boolean;
  isPhone: boolean;
  toggleAmount(): void;
  togglePhone(): void;
}

export const FormModal: React.FC<FormModalProps> = ({
  showFormModal,
  onToggleFormModal,
  beforeUpload,
  onChange,
  imageUrl,
  uploadButton,
  values,
  onSubmit,
  isSubmit,
  isAmount,
  isPhone,
  toggleAmount,
  togglePhone,
}) => {
  const { TextArea } = Input;
  return (
    <Modal
      title="New Payment Page"
      maskClosable={false}
      centered
      visible={showFormModal}
      footer={[
        <Button
          form="paymentPageForm"
          key="submit"
          htmlType="submit"
          type="primary"
          icon={isSubmit ? <LoadingOutlined /> : <PlusOutlined />}
          disabled={isSubmit ? true : false}
        >
          Create Page
        </Button>,
        <Button type="default" key="cancel" onClick={() => onToggleFormModal()}>
          Cancel
        </Button>,
      ]}
    >
      <Form
        layout="vertical"
        name="basic"
        initialValues={values}
        onFinish={onSubmit}
        id="paymentPageForm"
      >
        <Row>
          <Col span={24}>
            <Form.Item
              name="PageName"
              label="Page name"
              rules={[{ required: true }]}
            >
              <Input placeholder="Name of your page" />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              name="Description"
              label="Description"
              rules={[{ required: true }]}
            >
              <TextArea placeholder="Page description with extra instructions" />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item label="SEO Image (Optional)">
              <span>
                This image will show when the page is shared on social media. We
                recommend a 1024 x 512 pixel JPG or PNG, under 1 MB in size.
              </span>
              <Upload
                name="Logo"
                listType="picture-card"
                className="seo-uploader"
                showUploadList={false}
                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                beforeUpload={beforeUpload}
                onChange={onChange}
              >
                {imageUrl ? (
                  <img src={imageUrl} alt="" style={{ width: '100%' }} />
                ) : (
                  uploadButton
                )}
              </Upload>
            </Form.Item>
          </Col>
          <Col span={24}>
            <Checkbox onChange={toggleAmount}>
              I want a fixed payment amount on this page
            </Checkbox>
          </Col>
          {isAmount ? (
            <Col span={24}>
              <Form.Item name="Amount" label="Amount">
                <Input placeholder="Enter amount" />
              </Form.Item>
            </Col>
          ) : null}

          <Col span={24}>
            <Checkbox onChange={togglePhone}>
              Collect phone number on this page
            </Checkbox>
          </Col>
          {isPhone ? (
            <Col span={24}>
              <Form.Item name="PhoneNumber" label="Phone number">
                <Input placeholder="Enter phone number" />
              </Form.Item>
            </Col>
          ) : null}
          <Col span={24}>
            <Form.Item name="EmailAddress" label="Email address">
              <Input placeholder="Enter email address" />
            </Form.Item>
          </Col>

          <Col span={24}>
            <Form.Item
              name="RedirectUrl"
              label="Redirect after payment"
              rules={[{ required: true, message: 'Enter a redirect url' }]}
            >
              <Input placeholder="http://redirect-link" />
            </Form.Item>
            <Form.Item name="CustomUrl" label="Use your custom link">
              <Input
                addonBefore="https://araka.com/pay/"
                placeholder="[your-url]"
              />
            </Form.Item>

            <Form.Item name="SuccessMessage" label="Success Message">
              <Input placeholder="Message to show after payment" />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};
