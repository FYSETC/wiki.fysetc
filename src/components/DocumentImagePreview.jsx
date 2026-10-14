import React, {useCallback, useEffect, useId, useRef, useState} from 'react';
import styles from './DocumentImagePreview.module.css';

const copy = {
  zh: {
    title: '图片预览',
    preview: '查看原图',
    image: '文档图片',
    close: '关闭',
    hint: '可滚动查看原图，按 Esc 关闭。',
  },
  en: {
    title: 'Image preview',
    preview: 'View full-size image',
    image: 'Document image',
    close: 'Close',
    hint: 'Scroll to inspect the full-size image. Press Esc to close.',
  },
};

/** Adds an accessible original-image preview to non-linked document images. */
export default function DocumentImagePreview({children, language = 'en'}) {
  const messages = copy[language === 'zh' ? 'zh' : 'en'];
  const contentRef = useRef(null);
  const dialogRef = useRef(null);
  const triggerRef = useRef(null);
  const titleId = useId();
  const captionId = useId();
  const hintId = useId();
  const [preview, setPreview] = useState(null);
  const closePreview = useCallback(() => setPreview(null), []);

  useEffect(() => {
    const container = contentRef.current;
    if (!container) return undefined;

    const cleanup = [];
    for (const image of container.querySelectorAll('img')) {
      // Preserve image links and existing controls, including any image buttons.
      if (image.closest('a') || image.parentElement?.closest('button, [role="button"], summary')) {
        continue;
      }

      const attributes = ['tabindex', 'role', 'aria-label', 'data-zoomable'];
      const originalAttributes = attributes.map((name) => [name, image.getAttribute(name)]);
      const label = image.alt.trim() || messages.image;
      image.tabIndex = 0;
      image.setAttribute('role', 'button');
      image.setAttribute('aria-label', `${messages.preview}: ${label}`);
      image.dataset.zoomable = 'true';

      function openPreview(event) {
        if (event.defaultPrevented || (event.type === 'click' && event.button !== 0)) return;
        triggerRef.current = image;
        setPreview({src: image.src, alt: label});
      }

      function handleKeyDown(event) {
        if (event.target === image && (event.key === 'Enter' || event.key === ' ')) {
          event.preventDefault();
          triggerRef.current = image;
          setPreview({src: image.src, alt: label});
        }
      }

      image.addEventListener('click', openPreview);
      image.addEventListener('keydown', handleKeyDown);
      cleanup.push(() => {
        image.removeEventListener('click', openPreview);
        image.removeEventListener('keydown', handleKeyDown);
        for (const [name, value] of originalAttributes) {
          if (value === null) image.removeAttribute(name);
          else image.setAttribute(name, value);
        }
      });
    }

    return () => {
      cleanup.forEach((removeListeners) => removeListeners());
      closePreview();
    };
  }, [children, messages, closePreview]);

  useEffect(() => {
    if (!preview) return undefined;
    const dialog = dialogRef.current;
    const trigger = triggerRef.current;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    dialog.showModal();

    return () => {
      if (dialog.open) dialog.close();
      document.body.style.overflow = previousOverflow;
      if (trigger?.isConnected) trigger.focus({preventScroll: true});
    };
  }, [preview]);

  function handleBackdropClick(event) {
    if (event.target !== event.currentTarget) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const outsideDialog = event.clientX < rect.left || event.clientX > rect.right
      || event.clientY < rect.top || event.clientY > rect.bottom;
    if (outsideDialog) closePreview();
  }

  return (
    <>
      <div ref={contentRef} className="wiki-doc-content">{children}</div>
      <dialog
        ref={dialogRef}
        className={styles.dialog}
        aria-labelledby={titleId}
        aria-describedby={`${captionId} ${hintId}`}
        aria-modal="true"
        onCancel={(event) => {
          event.preventDefault();
          closePreview();
        }}
        onClose={closePreview}
        onClick={handleBackdropClick}>
        <div className={styles.header}>
          <div className={styles.heading}>
            <h2 id={titleId}>{messages.title}</h2>
            <p id={captionId} className={styles.caption}>{preview?.alt || messages.image}</p>
          </div>
          <button type="button" className={styles.close} onClick={closePreview}>
            <span aria-hidden="true">×</span>
            <span>{messages.close}</span>
          </button>
        </div>
        <div className={styles.viewport} tabIndex={0} role="region" aria-label={messages.preview}>
          {preview && <img className={styles.image} src={preview.src} alt={preview.alt} />}
        </div>
        <p id={hintId} className={styles.hint}>{messages.hint}</p>
      </dialog>
    </>
  );
}
