import React from "react";
import PropTypes from "prop-types";

import SubjectDropdown from "../common/SubjectDropdown";
import StudentsDragDrop from "../common/StudentsDragDrop";
import Loading from "../common/Loading";

import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import faEdit from "@fortawesome/fontawesome-free-solid/faEdit";
import faTrashAlt from "@fortawesome/fontawesome-free-solid/faTrashAlt";
import faPlusCircle from "@fortawesome/fontawesome-free-solid/faPlusCircle";
import faEye from "@fortawesome/fontawesome-free-solid/faEye";
import faCheck from "@fortawesome/fontawesome-free-solid/faCheck";
import faUndo from "@fortawesome/fontawesome-free-solid/faUndo";

function isDisabled(label, type, subject, loading, groupStudents, error) {
  return (
    label.value.length === 0 ||
    label.error != null ||
    type.value.length === 0 ||
    type.error != null ||
    subject.value == null ||
    subject.error != null ||
    loading ||
    error != null ||
    groupStudents.length === 0
  );
}

function GroupForm({
  modify,
  label,
  type,
  subject,
  loading,
  error,
  onChange,
  remainingStudents,
  groupStudents,
  onFormSubmit,
  onDragStudent,
  onDropStudent,
  onCancel
}) {
  return (
    <form onSubmit={onFormSubmit}>
      <div className="field">
        <label className="label">Nom du groupe</label>
        <div className="control">
          <input
            className="input"
            type="input"
            name="label"
            value={label.value}
            onChange={onChange}
          />
        </div>
      </div>

      <div className="field">
        <label className="label">Type de groupe</label>
        <div className="control">
          <div className="select parentSelectAlgo">
            <select name="type" required value={type.value} onChange={onChange} className="selectAlgorithme">
              <option value="LECTURE">Cours</option>
              <option value="TUTORIAL">TD/TP</option>
            </select>
          </div>
        </div>
      </div>
      <SubjectDropdown
        onChange={item =>
          onChange({
            target: {
              name: "subject",
              value: item
            }
          })
        }
        selectedItem={subject.value}
      />
      {loading ? (
        <Loading />
      ) : (
        <StudentsDragDrop
          remainingStudents={remainingStudents}
          groupStudents={groupStudents}
          onDrag={onDragStudent}
          onDrop={onDropStudent}
        />
      )}
      <div className="field">
        <div className="control">
          <button
            className={`button is-primary ${loading ? "is-loading" : ""}`}
            disabled={isDisabled(
              label,
              type,
              subject,
              loading,
              groupStudents,
              error
            )}
            type="submit"
          >
          {modify ? (
              <React.Fragment>
                <FontAwesomeIcon
                  icon={faEdit}
                  style={{ marginRight: "0.5rem", marginBottom: "0.2rem" }}
                />{" "}
                Modifier
              </React.Fragment>
            ) : (
              <React.Fragment>
                <FontAwesomeIcon
                  icon={faPlusCircle}
                  style={{ marginRight: "0.5rem", marginBottom: "0.2rem" }}
                />{" "}
                Ajouter
              </React.Fragment>
            )}
          </button>
          <button className="button" type="button" onClick={onCancel}>
          <FontAwesomeIcon
                  icon={faUndo}
                  style={{ marginRight: "0.5rem" }}
                />{" "} Annuler
          </button>
        </div>
      </div>
    </form>
  );
}

GroupForm.propTypes = {
  modify: PropTypes.bool,
  label: PropTypes.shape({
    value: PropTypes.string,
    error: PropTypes.string
  }),
  type: PropTypes.shape({
    value: PropTypes.string,
    error: PropTypes.string
  }),
  subject: PropTypes.shape({
    value: PropTypes.object,
    error: PropTypes.string
  }),
  remainingStudents: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      firstName: PropTypes.string,
      lastName: PropTypes.string,
      specialization: PropTypes.shape({
        label: PropTypes.string
      })
    })
  ),
  groupStudents: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      firstName: PropTypes.string,
      lastName: PropTypes.string,
      specialization: PropTypes.shape({
        label: PropTypes.string
      })
    })
  ),
  loading: PropTypes.bool,
  error: PropTypes.string,
  onChange: PropTypes.func,
  onCancel: PropTypes.func,
  onFormSubmit: PropTypes.func,
  onDragStudent: PropTypes.func,
  onDropStudent: PropTypes.func
};

GroupForm.defaultProps = {
  label: {
    value: "",
    error: null
  },
  type: {
    value: "LECTURE",
    error: null
  },
  subject: {
    value: null,
    error: null
  },
  loading: false,
  error: null,
  remainingStudents: [],
  groupStudents: [],
  onChange: () => {},
  onFormSubmit: () => {},
  onCancel: () => {},
  onDragStudent: () => {},
  onDropStudent: () => {}
};

export default GroupForm;
