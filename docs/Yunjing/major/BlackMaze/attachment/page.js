function uploadFile(file) {
    console.log("上传文件到服务器:", file.name);
    // 模拟上传文件的请求
    fetch('/file/upload', {
        method: 'POST',
        body: file
    })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                console.log("文件上传成功:", data);
            } else {
                console.error("文件上传失败:", data.message);
            }
        })
        .catch(error => {
            console.error("上传文件失败:", error);
        });
}

function downloadFile(path) {
    console.log(`正在下载文件: ${path}`);

    // 模拟从服务器请求下载文件
    fetch(`/file/download?path=${encodeURIComponent(path)}`, {
        method: 'GET'
    })
        .then(response => {
            if (!response.ok) {
                throw new Error("文件下载失败，服务器返回错误");
            }
            return response.blob();  // 返回文件内容的 Blob 对象
        })
        .then(blob => {
            // 创建一个 URL 对象用于下载文件
            const link = document.createElement("a");
            link.href = URL.createObjectURL(blob);
            link.download = path.split('/').pop();  // 提取文件名作为下载时的文件名
            link.click();  // 自动触发下载
            console.log(`文件下载成功: ${path}`);
        })
        .catch(error => {
            console.error("文件下载失败:", error);
        });
}

function renameFile(filePath, newFileName) {
    console.log(`重命名文件 ${filePath} 为 ${newFileName}`);
    fetch('/file/rename', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ filePath, newFileName })
    })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                console.log("文件重命名成功:", data);
            } else {
                console.error("文件重命名失败:", data.message);
            }
        })
        .catch(error => {
            console.error("重命名失败:", error);
        });
}

function deleteFile(filePath) {
    console.log("删除文件:", filePath);
    fetch('/file/delete', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ filePath })
    })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                console.log("文件删除成功:", data);
            } else {
                console.error("文件删除失败:", data.message);
            }
        })
        .catch(error => {
            console.error("删除文件失败:", error);
        });
}

function moveFile(sourcePath, destinationPath) {
    console.log(`移动文件从 ${sourcePath} 到 ${destinationPath}`);
    fetch('/file/move', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sourcePath, destinationPath })
    })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                console.log("文件移动成功:", data);
            } else {
                console.error("文件移动失败:", data.message);
            }
        })
        .catch(error => {
            console.error("移动文件失败:", error);
        });
}

function copyFile(sourcePath, destinationPath) {
    console.log(`复制文件从 ${sourcePath} 到 ${destinationPath}`);
    fetch('/file/copy', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sourcePath, destinationPath })
    })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                console.log("文件复制成功:", data);
            } else {
                console.error("文件复制失败:", data.message);
            }
        })
        .catch(error => {
            console.error("复制文件失败:", error);
        });
}

function readFile(filePath) {
    console.log("读取文件:", filePath);
    fetch(`/file/read?path=${encodeURIComponent(filePath)}`)
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                console.log("文件内容:", data.content);
            } else {
                console.error("读取文件失败:", data.message);
            }
        })
        .catch(error => {
            console.error("读取文件失败:", error);
        });
}

function getFileStats(filePath) {
    console.log("获取文件信息:", filePath);
    fetch(`/file/stats?path=${encodeURIComponent(filePath)}`)
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                console.log("文件信息:", data.stats);
            } else {
                console.error("获取文件信息失败:", data.message);
            }
        })
        .catch(error => {
            console.error("获取文件信息失败:", error);
        });
}

function searchFiles(query) {
    console.log("搜索文件:", query);
    fetch(`/file/search?query=${encodeURIComponent(query)}`)
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                console.log("搜索结果:", data.files);
            } else {
                console.error("搜索失败:", data.message);
            }
        })
        .catch(error => {
            console.error("搜索文件失败:", error);
        });
}

function createDirectory(directoryPath) {
    console.log("创建目录:", directoryPath);
    fetch('/file/create-directory', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ directoryPath })
    })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                console.log("目录创建成功:", data);
            } else {
                console.error("目录创建失败:", data.message);
            }
        })
        .catch(error => {
            console.error("创建目录失败:", error);
        });
}

function deleteDirectory(directoryPath) {
    console.log("删除目录:", directoryPath);
    fetch('/file/delete-directory', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ directoryPath })
    })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                console.log("目录删除成功:", data);
            } else {
                console.error("目录删除失败:", data.message);
            }
        })
        .catch(error => {
            console.error("删除目录失败:", error);
        });
}