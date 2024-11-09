"use client";

import {
  Button,
  ConfigProvider,
  Input,
  message,
  Tag,
  Upload,
  UploadProps,
} from "antd";
import styles from "./ui.module.scss";
import { CloseCircleOutlined, UploadOutlined } from "@ant-design/icons";
import { checkInputThemeContext } from "../theme";
import { ChangeEvent, ClipboardEvent, useState } from "react";
import Link from "next/link";
import { isValidLink, parseLinks } from "../model";
import { DraggableUploadListItem } from "../drabbleUploadListItem";
import { UploadFile } from "antd/lib";
export const CheckInput = ({
  sessionLinks = [],
  setSessionLinks,
}: {
  sessionLinks: string[];
  setSessionLinks: (arg: string[]) => void;
}) => {
  const [fileList, setFileList] = useState<UploadFile[]>();
  const [textAreaValue, setTextAreaValue] = useState<string>("");
  const [hasError, setHasError] = useState(false); // Перенесено на уровень компонента

  const updateLinks = (newLinks: string[]) => {
    const uniqueLinks = Array.from(new Set(newLinks));
    setSessionLinks(uniqueLinks);
    setTextAreaValue(uniqueLinks.join("\n").trim());
  };

  const onTablePaste = (e: ClipboardEvent<HTMLTextAreaElement>) => {
    e.preventDefault();
    const data = e.clipboardData.getData("text");
    const parsedLinks = parseLinks(data);

    updateLinks([...sessionLinks, ...parsedLinks]);
  };

  const onChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    setTextAreaValue(newValue);

    const parsedLinks = parseLinks(newValue.replace(/\n/g, " "));
    setSessionLinks(parsedLinks);
  };

  const onClear = () => {
    setTextAreaValue("");
    setSessionLinks([]);
    setFileList([]);
    setHasError(false); // Сбрасываем флаг ошибки
  };

  const onFileChange: UploadProps["onChange"] = async ({ file }) => {
    const uploadedFile = file.originFileObj;
    if (uploadedFile) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const fileContent = event.target?.result as string;
        const parsedLinks = parseLinks(fileContent);

        const validLinks = parsedLinks.filter((link) => isValidLink(link));
        const invalidLinks = parsedLinks.filter((link) => !isValidLink(link));

        // Проверка на наличие ошибок
        if (invalidLinks.length > 0 && !hasError) {
          setHasError(true); // Устанавливаем флаг ошибки
          message.error("Файл содержит ссылки с неверным форматом.");
          return;
        }

        // Если ошибок нет, сбрасываем флаг
        if (validLinks.length > 0) {
          setHasError(false);
          updateLinks([...sessionLinks, ...validLinks]);
        }
      };
      reader.readAsText(uploadedFile);
    }
    setFileList(fileList);
  };

  const onTagClose = (linkToRemove: string) => {
    const updatedLinks = sessionLinks.filter((link) => link !== linkToRemove);
    updateLinks(updatedLinks);
  };

  return (
    <ConfigProvider theme={checkInputThemeContext}>
      <div className={styles.checkInputWrap}>
        <div className={styles.checkInputData}>
          <Input.TextArea
            allowClear
            onClear={onClear}
            value={textAreaValue}
            onChange={onChange}
            onPaste={onTablePaste}
            placeholder="Введите ссылку или несколько ссылок на котировочную сессию"
            size="large"
            autoSize
          />
          <Upload
            onChange={onFileChange}
            maxCount={1}
            accept=".txt, .doc, .pdf"
            fileList={fileList}
            itemRender={(originNode, file) => (
              <DraggableUploadListItem originNode={originNode} file={file} />
            )}
          >
            <Button
              style={{ height: "48px" }}
              size="large"
              type="primary"
              icon={<UploadOutlined />}
            >
              Импортировать из файла
            </Button>
          </Upload>
        </div>
        <div className={styles.tagsWrap}>
          {sessionLinks.map((sessionLink, index) => (
            <Tag
              style={{
                height: "32px",
                fontSize: "14px",
                alignItems: "center",
                display: "flex",
                gap: "4px",
              }}
              onClose={() => onTagClose(sessionLink)}
              closeIcon={<CloseCircleOutlined />}
              key={index}
            >
              <Link target="_blank" href={sessionLink}>
                {sessionLink}
              </Link>
            </Tag>
          ))}
        </div>
      </div>
    </ConfigProvider>
  );
};
