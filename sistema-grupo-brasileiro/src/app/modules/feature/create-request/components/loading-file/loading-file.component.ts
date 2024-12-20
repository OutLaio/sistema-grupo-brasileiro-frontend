import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';

/**
 * Componente responsável pelo upload de arquivos com simulação de progresso.
 * Permite arrastar e soltar arquivos ou selecionar através do input de arquivos.
 * Exibe o progresso de upload e permite excluir arquivos após o upload completo.
 */
@Component({
  selector: 'app-loading-file',
  templateUrl: './loading-file.component.html',
  styleUrls: ['./loading-file.component.css']
})
export class LoadingFileComponent {
  /**
   * Progresso do upload do arquivo em porcentagem.
   * Valor inicial é 0%.
   */
  progress: number = 0;

  /**
   * Referência ao elemento de drop de arquivos.
   * Usado para arrastar e soltar arquivos.
   */
  @ViewChild("fileDropRef", { static: false }) fileDropEl: ElementRef | undefined;
  /**
   * Lista de arquivos carregados, com informações como nome, URL e progresso de upload.
   */
  files: any[] = [];
  /**
   * Evento emitido quando os arquivos são carregados com sucesso.
   * Emite um array de objetos com o nome e a URL dos arquivos carregados.
   */
  @Output() filesLoaded: EventEmitter<{ name: string, url: string }[]> = new EventEmitter();


  /**
   * Retorna a URL de um arquivo utilizando a API `URL.createObjectURL`.
   * Isso é usado para criar uma URL temporária para exibição do arquivo.
   * 
   * @param {File} file O arquivo que será exibido.
   * @returns {string} A URL temporária do arquivo.
   */
  getImageUrl(file: File): string {
    return window.URL.createObjectURL(file);
  }


  /**
   * Manipula o evento de "arrastar e soltar" arquivos.
   * 
   * @param {any} $event O evento contendo os arquivos arrastados.
   */
  onFileDropped($event: any) {
    const fileList = $event as File[];
    this.prepareFilesList(fileList);
  }

  /**
   * Manipula o evento de upload de arquivos a partir de um input de arquivos.
   * 
   * @param {FileList} files Lista de arquivos selecionados pelo usuário.
   */
  onFileUpload(files: FileList): void {
    const uploadedFiles: { name: string, url: string }[] = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const url = URL.createObjectURL(file);
      uploadedFiles.push({ name: file.name, url });
    }

    this.filesLoaded.emit(uploadedFiles);
  }

  /**
   * Manipula o evento de seleção de arquivos através de um input de arquivo.
   * 
   * @param {Event} event O evento disparado pela ação de seleção de arquivos.
   */
  fileBrowseHandler(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement && inputElement.files) {
      this.prepareFilesList(Array.from(inputElement.files));
    }
  }

  /**
   * Exclui um arquivo da lista de arquivos carregados.
   * O arquivo só pode ser excluído se o progresso de upload for 100%.
   * 
   * @param {number} index O índice do arquivo a ser excluído.
   */
  deleteFile(index: number) {
    if (this.files[index].progress < 100) {
      return;
    }
    this.files.splice(index, 1);
    this.filesLoaded.emit(this.files.map(file => ({ name: file.name, url: URL.createObjectURL(file) })));
  }

  /**
   * Simula o processo de upload dos arquivos, aumentando o progresso de cada arquivo em intervalos regulares.
   * Quando o upload de um arquivo é concluído, o próximo arquivo é iniciado.
   * 
   * @param {number} index O índice do arquivo a ser carregado.
   */
  uploadFilesSimulator(index: number) {
    setTimeout(() => {
      if (index === this.files.length) {
        return;
      } else {
        const progressInterval = setInterval(() => {
          if (this.files[index].progress === 100) {
            clearInterval(progressInterval);
            this.uploadFilesSimulator(index + 1);
          } else {
            this.files[index].progress += 10;
          }
        }, 200);
      }
    }, 500);
  }

  /**
   * Prepara a lista de arquivos a serem carregados, configurando a URL e o progresso inicial de cada arquivo.
   * Em seguida, emite o evento `filesLoaded`.
   * 
   * @param {Array<any>} files Lista de arquivos a serem carregados.
   */
  prepareFilesList(files: Array<any>) {
    for (const item of files) {
      item.progress = 0;
      item.url = this.getImageUrl(item);
      this.files.push(item);
    }
    if (this.fileDropEl) {
      this.fileDropEl.nativeElement.value = "";
    }
    this.uploadFilesSimulator(0);
    this.filesLoaded.emit(this.files.map(file => ({ name: file.name, url: file.url })));
  }


  /**
   * Converte bytes para uma unidade legível como KB, MB, GB, etc.
   * 
   * @param {number} bytes O valor em bytes a ser convertido.
   * @param {number} [decimals=2] O número de casas decimais a ser exibido (opcional, padrão é 2).
   * @returns {string} O valor convertido em uma unidade legível.
   */
  formatBytes(bytes: number, decimals = 2) {
    if (bytes === 0) {
      return "0 Bytes";
    }
    const k = 1024;
    const dm = decimals <= 0 ? 0 : decimals;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
  }

  /**
   * Libera os recursos usados pelo componente, como URLs de arquivos temporários.
   * Chamado quando o componente é destruído.
   */
  ngOnDestroy() {
    this.files.forEach(file => {
      if (file.url) {
        window.URL.revokeObjectURL(file.url);
      }
    });
  }
}
