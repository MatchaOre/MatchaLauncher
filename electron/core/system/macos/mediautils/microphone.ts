import { systemPreferences } from "electron";
import os from "node:os";

async function grantMicrophonePermission(): MicrophoneGrantStatus{
    if(process.env.OS_TYPE !== SystemType.macOS) 
        return MicrophoneGrantStatus.NotSuppotrted;
    switch(systemPreferences.getMediaAccessStatus("microphone")){
        case "granted":
            return MicrophoneGrantStatus.Granted;
        case "denied":
            return MicrophoneGrantStatus.SystemDenied;
        case "not-determined":
            break;
        case "restricted":
            return MicrophoneGrantStatus.Restrict
        case "unknown":
    }
}

enum MicrophoneGrantStatus{
    /** 已授权 */
    Granted,
    /** 用户拒绝了授权 */
    UserReject,
    /** 已被系统自动拒绝 */
    SystemDenied,
    /** 在此平台上不受支持 */
    NotSuppotrted,
    /** 设置由第三方管理 */
    Restrict,
    /** 未知状态 */
}