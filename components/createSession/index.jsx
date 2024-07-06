import React, { useState, useRef } from 'react';
import SlotForm from '../../components/sessionSlotForm'; // Assuming SlotForm component is defined
import sessionRoomType from '../../utils/sessionRoomType'
import TagsInput from "@/components/common/Tags";
import DependentImageUploader from '../common/ParentImageUpload';
import { selectTags } from '@/store/features/postsSlice';
import { useSelector } from 'react-redux';
// import { Modal } from 'antd';

const CreateSessionForm = () => {

  const suggestionTags = useSelector(selectTags);
  const [sessionForm, setSessionForm] = useState({
    title: '',
    desc: '',
    sessionType: '',
    tags: [],
    isVideoChannel: false,
    isCourse: false,
    isExclusive: false,
    communityId: '',
    infoImgs: [],
    isRecurring: 'none',
    slots: [],
  });

  const [tags, setTags] = useState([]);
  const [repeatCount, setRepeatCount] = useState(2);
  const [newResources, setNewResources] = useState([]);
  const [deleteResources, setDeleteResources] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [makeModal, setMakeModal] = useState(false);
  const [discardModal, setDiscardModal] = useState(false);
  const [isCourseDisabled, setIsCourseDisabled] = useState(false);

  const form = useRef(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (e.target.name === "isVideoChannel") {
      console.log("in is videoChannel");
      console.log(sessionForm);
      setIsCourseDisabled(!isCourseDisabled);
    }
    if (type === 'checkbox') {
      setSessionForm((prev) => ({
        ...prev,
        [name]: checked,
      }));
    } else {
      setSessionForm((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic
    console.log('Form submitted:', sessionForm);
  };

  const handleAddResource = () => {
    // Logic to add new resource to newResources state
    const newResource = { name: '', link: '' };
    setNewResources((prev) => [...prev, newResource]);
  };

  const handleRemoveResource = (item) => {
    // Logic to remove resource from newResources state
    setNewResources((prev) => prev.filter((res) => res !== item));
  };

  const handleClearForm = () => {
    // Logic to clear form fields
    setSessionForm({
      title: '',
      desc: '',
      sessionType: '',
      tags: [],
      isVideoChannel: false,
      isCourse: false,
      isExclusive: false,
      communityId: '',
      infoImgs: [],
      isRecurring: 'none',
      slots: [],
    });
  };

  const handleDiscardChanges = () => {
    // Logic to handle discarding changes
    setDiscardModal(true); // Show discard changes modal
  };

  const handleExistingChange = (index) => (e) => {
    // Logic to handle changes in existing resources
    const { name, value } = e.target;
    // Implement logic to update existing resource in resources state
  };

  return (
    <div className="createsessionform__container">
      <form
        className="createsessionform__form"
        method="POST"
        ref={form}
        onSubmit={handleSubmit}
      >
        <div className="input__group">
          <div className="input__group__header">
            <p>Basic Information</p>
          </div>
          <label htmlFor="title" className="label">
            <span className="label__text">
              Title
              <span className="text-red-500">*</span>
            </span>
            <input
              type="text"
              id="title"
              name="title"
              className="input"
              required
              value={sessionForm?.title}
              onChange={handleChange}
            />
          </label>
          <label htmlFor="desc" className="label">
            <span className="label__text">
              Description
              <span className="text-red-500">*</span>
            </span>
            <textarea
              id="desc"
              name="desc"
              className="input"
              defaultValue={sessionForm?.desc}
              onChange={handleChange}
              required
            />
          </label>
          <label htmlFor="sessionType" className="label">
            <span className="label__text">
              Session Type
              <span className="text-red-500">*</span>
            </span>
            <label htmlFor="sessionType">
              <input
                type="radio"
                name="sessionType"
                value={sessionRoomType[1]}
                className="mr-2"
                required
                defaultChecked
                onChange={handleChange}
              />
              Allow everyone to speak
            </label>
            {/* <label htmlFor="sessionType">
              <input
                type="radio"
                name="sessionType"
                value={sessionRoomType[2]}
                className="mr-2"
                required
                onChange={handleChange}
              />
              Make everyone listener
            </label> */}
          </label>
          <div>
            <span className="label__text">Mention Category/ Add tags</span>
            <TagsInput
              tags={tags}
              setTags={setTags}
              suggestions={suggestionTags}
            />
          </div>

          <>
            <label
              className="label-checkbox"
              htmlFor={`session-isVideoChannel`}
            >
              <input
                type="checkbox"
                id={`session-videoChannel`}
                name="isVideoChannel"
                defaultValue={sessionForm?.isVideoChannel}
                onChange={handleChange}
              />
              <span className="label__text">
                {"Is the session a Video Channel?"}
              </span>
            </label>
            <label className="label-checkbox" htmlFor={`session-course`}>
              <input
                type="checkbox"
                id={`session-course`}
                name="isCourse"
                defaultValue={sessionForm.isCourse}
                onChange={handleChange}
                disabled={isCourseDisabled}
              />
              <span className="label__text">
                {"Is the session a course(group of slots sold as One)?"}
              </span>
            </label>
            {/* <label className="label-checkbox" htmlFor={`session-isexclusive`}>
              <input
                type="checkbox"
                id={`session-isexclusive`}
                name="isExclusive"
                defaultValue={sessionForm.isExclusive}
                onChange={handleChange}
              />
              <span className="label__text">
                {"Exclusive Session?"}
                <p className="text-sm text-gray-400 ml-4">
                  Session could only be accessible for a particular community
                </p>
              </span>
            </label> */}
          </>
          {sessionForm?.isExclusive && (
            <select
              defaultValue={sessionForm.communityId}
              onChange={handleChangeCommunity}
              value={item[0]?.title}
              name="communityId"
            >
              {allCommunities?.map((item) => (
                // eslint-disable-next-line react/jsx-key
                <option value={item.id}>{item.title}</option>
              ))}
            </select>
          )}
          {sessionForm.title && (
            <DependentImageUploader
              content={"Upload Session img"}
              imgUrl={sessionForm.infoImgs[0]}
              bucket={"subspace-test-0"}
              bucket_name={"session-images-0"}
              name={"infoImgs"}
              file_name={sessionForm.title}
              uploading={uploading}
              setUploading={setUploading}
              urlRef={urlRef}
              setError={setError}
              error={error}
            />
          )}
        </div>
        <div className="input__group">
          {!isEdit ? (
            <label className="label-checkbox" htmlFor={`session-course`}>
              <span className="label__text">
                {"Is it a recurring session?"}
              </span>
              <select
                className="input"
                name="isRecurring"
                id={`slot-recurring`}
                onChange={handleChange}
                defaultValue={"none"}
              >
                <option value={"none"}>Not Recurring</option>
                <option value={"weekly"} disabled>
                  Weekly Recurring
                </option>
                <option value={"monthly"} disabled>
                  Monthly Recurring
                </option>
              </select>
              <span className="text-sm text-gray-400">
                {"Weekly repetitive: eg, Every monday at 640pm."}
                <br />
                {" Monthly repetitive: eg, 15th of every month at 330pm"}
              </span>
            </label>
          ) : (
            <label className="label-checkbox" htmlFor={`session-course`}>
              <span className="label__text">
                {"Is it a recurring session?"}
              </span>
              <select
                className="input"
                name="isRecurring"
                id={`slot-recurring`}
                value={sessionForm.isRecurring}
              >
                <option value={"none"}>Not Recurring</option>
                <option value={"weekly"}>Weekly Recurring</option>
                <option value={"monthly"}>Monthly Recurring</option>
              </select>
              <span className="text-sm text-gray-400">
                {"You wont be able to change it now. Just for info."}
              </span>
            </label>
          )}
          {sessionForm?.isRecurring !== "none" && !isEdit && (
            <label className="label-checkbox" htmlFor={`session-number`}>
              <span className="label__text">{"How many repetitions?"}</span>
              <select
                className="input"
                name="number"
                id={`slot-number`}
                value={repeatCount}
                onChange={(e) => setRepeatCount(e.target.value)}
              >
                <option value={2}>2x</option>
                <option value={3}>3x</option>
                <option value={5}>5x</option>
              </select>
            </label>
          )}
          <div className="input__group__header">
            <p>Session Slots</p>
            <button
              className="button button-blue"
              onClick={() => dispatch(addSlot())}
            >
              + Add Slot
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-14">
            {!isEdit || sessionForm.isRecurring === "none"
              ? sessionForm.slots.map((slot, index) => {
                  return (
                    <SlotForm
                      key={"slot" + index + "form"}
                      slot={slot}
                      index={index}
                      comId={communityId}
                      allCommunities={allCommunities}
                    />
                  );
                })
              : decipherBaseSlots(
                  sessionForm.slots,
                  sessionForm.isRecurring
                )?.map((slot, index) => {
                  return (
                    <SlotForm
                      key={"slot" + index + "form"}
                      slot={slot}
                      index={index}
                      comId={communityId}
                      allCommunities={allCommunities}
                    />
                  );
                })}
          </div>
        </div>

        {/* resources */}
        {isEdit ? (
          resources
            .filter((x) => !deleteResources.some((y) => y.id === x.id))
            ?.map((item, index) => (
              // eslint-disable-next-line react/jsx-key
              <div className="">
                <label>Resource {index + 1}</label>
                <label htmlFor="resourceName" className="label">
                  <span className="label__text">Name</span>
                  <input
                    type="text"
                    id="res_name"
                    name="name"
                    className="input"
                    required
                    value={item.name}
                    onChange={handleExistingChange(index)}
                  />
                </label>
                <label htmlFor="resourceName" className="label">
                  <span className="label__text">Link</span>
                  <input
                    type="text"
                    id="res_name"
                    name="link"
                    className="input"
                    required
                    value={item.link}
                    onChange={handleExistingChange(index)}
                  />
                </label>
                <div className="mt-6">
                  <label
                    className="button button-blue flex-1"
                    onClick={
                      () => handleRemove(item)
                      // ()=>setResourceArr((ele)=>{
                      //   const arr = [...ele]
                      //   arr.splice(item.id,1)
                      //   return arr
                      // })
                    }
                  >
                    Remove
                  </label>
                </div>
              </div>
            ))
        ) : (
          <></>
        )}

        {newResources.map((item, index) => {
          return (
            // eslint-disable-next-line react/jsx-key
            <div className="">
              <label>
                Resource{" "}
                {isEdit
                  ? resources
                    ? index + 1 + resources.length
                    : index + 1
                  : index + 1}
              </label>
              <label htmlFor="resourceName" className="label">
                <span className="label__text">
                  Name
                  <span className="text-red-500">*</span>
                </span>
                <input
                  type="text"
                  id="res_name"
                  name="name"
                  className="input"
                  required
                  onChange={handleNewChange(index)}
                  value={item.name}
                />
              </label>
              <label htmlFor="resourceName" className="label">
                <span className="label__text">
                  Link
                  <span className="text-red-500">*</span>
                </span>
                <input
                  type="text"
                  id="res_name"
                  name="link"
                  className="input"
                  required
                  defaultValue={""}
                  onChange={handleNewChange(index)}
                  value={item.link}
                />
              </label>
              <div className="mt-6">
                <label
                  className="button button-blue flex-1"
                  onClick={() => handleRemoveResource(item)}
                >
                  Remove
                </label>
              </div>
            </div>
          );
        })}

        <label
          className="button button-blue flex-1"
          onClick={() => handleAddResource()}
        >
          Add New Resource
        </label>

        {isEdit && (
          <div className="flex flex-row flex-wrap gap-2" type="submit">
            <button className="button button-blue flex-1">Edit Session</button>

            <button
              className="button button-blue flex-1"
              onClick={handleDiscardChanges}
            >
              Discard Changes
            </button>
          </div>
        )}
        {!isEdit && (
          <div className="flex flex-row flex-wrap gap-2" type="submit">
            <button className="button button-blue flex-1">
              Create Session
            </button>

            <button
              className="button button-blue flex-1"
              onClick={handleClearForm}
            >
              Reset Form
            </button>
          </div>
        )}
      </form>
      {/* {isEdit && makeModal ? (
        <Modal
          text={"Are you sure you want to make changes?"}
          setModal={setMakeModal}
          newResources={newResources}
          deleteResources={deleteResources}
          resourceArr={resourceArr}
          form={form}
          setResourceArr={setResourceArr}
          resources={resources}
          setNewResources={setNewResources}
          setDeleteResources={setDeleteResources}
          clearForm={clearForm}
          isEdit={true}
          urlRef={urlRef}
          createForm={createForm}
        />
      ) : (
        <></>
      )} */}
      {/* {discardModal ? (
        <Modal
          text={"Are you sure you want to discard the changes?"}
          setModal={setDiscardModal}
          newResources={newResources}
          deleteResources={deleteResources}
          resourceArr={resourceArr}
          form={form}
          setResourceArr={setResourceArr}
          resources={resources}
          setNewResources={setNewResources}
          setDeleteResources={setDeleteResources}
          clearForm={clearForm}
          isEdit={false}
          urlRef={urlRef}
          createForm={createForm}
        />
      ) : (
        <></>
      )} */}
    </div>
  );
}

export default CreateSessionForm;
