import React from 'react'
import { UploadFile } from './upload'
import Icon from '../Icon/icon'

interface UploadListProps {
  fileList: UploadFile[]
  onRemove: (_file: UploadFile) => void
}

const UploadList: React.FC<UploadListProps> = (props) => {
  const { fileList, onRemove } = props

  const renderFileList = () => {
    return fileList.map((file, index) => {
      return (
        <li key={file.fid} className="upload-list-item">
          <span className={`file-name file-name-${file.status}`}>
            <Icon icon="file-alt" theme="secondary" />
            {file.name}
          </span>
          <span className="file-status">
            {file.status === 'uploading' && (
              <Icon icon="spinner" spin theme="primary" />
            )}
            {file.status === 'success' && (
              <Icon icon="check-circle" theme="success" />
            )}
            {file.status === 'error' && (
              <Icon icon="times-circle" theme="danger" />
            )}
          </span>
          <span className="file-action">
            <Icon
              icon="times"
              onClick={() => {
                onRemove(file)
              }}
            />
          </span>
        </li>
      )
    })
  }
  return <ul className="upload-list">{renderFileList()}</ul>
}

export default UploadList
