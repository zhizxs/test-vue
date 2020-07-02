<template>
        <div id="app">
            <ckeditor :editor="editor" @ready="onReady"  ></ckeditor>
				<hr>
             <vue-editor v-model="content" />
        </div>
</template>

<script>
    import DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document';
import { VueEditor, Quill } from "vue2-editor";
import { ImageDrop } from "quill-image-drop-module";
import ImageResize from "quill-image-resize-module";


Quill.register("modules/imageDrop", ImageDrop);
Quill.register("modules/imageResize", ImageResize);
    export default { 
        name: 'app',
        data() {
            return {
                editor: DecoupledEditor,
/***************************************************/ 
                 content: '',
            customModulesForEditor: [
                { alias: "imageDrop", module: ImageDrop },
                { alias: "imageResize", module: ImageResize }
            ],
            editorSettings: {
                modules: {
                    imageDrop: true,
                    imageResize: {}
                }
            }

            };
        },
         components: { VueEditor },
        methods: {
            onReady( editor )  {
                editor.ui.getEditableElement().parentElement.insertBefore(
                    editor.ui.view.toolbar.element,
                    editor.ui.getEditableElement()
                );
            },
            handleImageAdded: function(file, Editor, cursorLocation, resetUploader) {
            var formData = new FormData();
            formData.append("image", file);
            axios({
                    url: "https://fakeapi.yoursite.com/images",
                    method: "POST",
                    data: formData
                })
                .then(result => {
                    let url = result.data.url; // Get url from response
                    Editor.insertEmbed(cursorLocation, "image", url);
                    resetUploader();
                })
                .catch(err => {
                    console.log(err);
                });
        }
        }
    }
</script>