import React, { useState, useRef } from 'react'
import classNames from 'classnames'
import UploadList from './uploadList'
import Button from '../Button/button'
import axios from 'axios'

export type UploadFileStatus = 'ready' | 'uploading' | 'success' | 'error'
export interface UploadFile {
  fid: string
  size: number
  name: string
  status?: UploadFileStatus
  percent?: number
  raw?: File
  response?: any
  error?: any
}
export interface IUploadProps {
  action: string
  defaultFileList?: UploadFile[]
  onProgress?: (percentage: number, file: File) => void
  onSuccess?: (data: any, file: File) => void
  onError?: (err: any, file: File) => void
  beforeUpload?: (file: File) => boolean | Promise<File>
  onChange?: (state: boolean, file: File) => void
  onRemove?: (file: UploadFile) => void
}

const Upload: React.FC<IUploadProps> = (props) => {
  const {
    action,
    defaultFileList,
    onProgress,
    onSuccess,
    onError,
    beforeUpload,
    onChange,
    onRemove,
  } = props
  const [fileList, setFileList] = useState<UploadFile[]>(defaultFileList || [])
  const inputFileRef = useRef<HTMLInputElement>(null)
  // 更新文件列表
  const updateFileList = (
    updateFile: UploadFile,
    updateObj: Partial<UploadFile>
  ) => {
    setFileList((prevList) => {
      return prevList.map((file) => {
        if (file.fid === updateFile.fid) {
          return { ...file, ...updateObj }
        } else {
          return file
        }
      })
    })
  }
  // 触发文件上传事件
  const handleClickUpload = () => {
    if (inputFileRef.current) {
      // 触发文件上传事件
      inputFileRef.current.click()
    }
  }
  // 文件改变后上传文件
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files) return
    uploadFile(files) // 上传文件
    if (inputFileRef.current) {
      inputFileRef.current.value = '' // 上传文件后清空
    }
  }
  const uploadFile = (files: FileList) => {
    const arrFiles = Array.from(files)
    arrFiles.forEach((file, index) => {
      if (!beforeUpload) {
        uploadPost(file)
      } else {
        const result = beforeUpload(file)
        if (result && result instanceof Promise) {
          result.then((processedFile) => {
            uploadPost(processedFile)
          })
        } else if (result !== false) {
          uploadPost(file)
        } else if (result === false) {
          if (onChange) onChange(false, file)
        }
      }
    })
  }
  const uploadPost = (file: File) => {
    const _file: UploadFile = {
      fid: Date.now() + 'upload-file',
      status: 'ready',
      name: file.name,
      size: file.size,
      percent: 0,
      raw: file,
    }
    setFileList([_file, ...fileList])
    const formData = new FormData()
    formData.append(file.name, file)
    axios({
      method: 'POST',
      url: action,
      data: formData,
      headers: {
        'Content-Type': 'multipart/form-data',
        'Access-Control-Allow-Origin': '*',
      },
      withCredentials: true,
      onUploadProgress: (e) => {
        let percentage = Math.round((e.loaded * 100) / e.total) || 0
        if (percentage < 100) {
          // 更新前的列表prevList
          //   setFileList((prevList) => {
          //     console.log(prevList)
          //     return prevList
          //   })
          // 更新当前文件的状态
          updateFileList(_file, { percent: percentage, status: 'uploading' })
          if (onProgress) onProgress(percentage, file)
        }
      },
    })
      .then((res) => {
        //   console.log(res)
        updateFileList(_file, {
          percent: 100,
          status: 'success',
          response: res.data,
        })
        if (onSuccess) onSuccess(res.data, file)
        if (onChange) onChange(true, file)
      })
      .catch((err) => {
        //   console.log(err)
        updateFileList(_file, { status: 'error', error: err })
        if (onError) onError(err, file)
        if (onChange) onChange(false, file)
      })
  }
  const handleRemoveFile = (file: UploadFile) => {
    // 1.
    // const newFileList = fileList.filter((item) => {
    //   return item.fid !== file.fid
    // })
    // setFileList(newFileList)
    // 2.
    setFileList((prevList) => {
        return prevList.filter(item => item.fid !== file.fid)
    })
    // upload的onRemove
    if(onRemove) onRemove(file)
  }
  //   console.log(fileList)
  return (
    <div className="upload-component">
      <Button onClick={handleClickUpload}>Upload File</Button>
      <input
        ref={inputFileRef}
        className="upload-file"
        style={{ display: 'none' }}
        type="file"
        name="uploadfile"
        onChange={handleFileChange}
      />
      <UploadList fileList={fileList} onRemove={handleRemoveFile} />
    </div>
  )
}

export default Upload
