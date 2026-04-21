h5gg.require(7.9);

var h5frida=h5gg.loadPlugin("h5frida", "h5frida-15.1.24.dylib");
if(!h5frida) throw "Failed to load h5frida plugin";

alert("frida plugin version="+h5frida.pluginVersion() + "\nfrida core version="+h5frida.coreVersion());

function ActiveCodePatch(fpath, rvaddr, bytes) {
    if(!h5frida.ActiveCodePatch(fpath, rvaddr, bytes)) {
        var result = h5frida.ApplyCodePatch(fpath, rvaddr, bytes);
        alert(fpath+":0x"+rvaddr.toString(16)+"-PatchFailed!\n" + result);return false;
    } return true;
}
function DeactiveCodePatch(fpath, rvaddr, bytes) {
    return h5frida.DeactiveCodePatch(fpath, rvaddr, bytes);
}

/* 
fpath: relative path of the binary in the .app directory

rvaddr: relative virtual address
Generally speaking, for dylib/framework,  rvaddr = [offset in file] = [address in IDA]
for main executable, rvaddr = offset in file = [address in IDA] - [base address in IDA], the base address is usually 0x100000000.
*/
/*************************************************************************/

//switch on
ActiveCodePatch("Frameworks/UnityFramework.framework/UnityFramework", 0x1A21658, "C0035FD6");

//switch off
DeactiveCodePatch("Frameworks/UnityFramework.framework/UnityFramework", 0x1A21658, "C0035FD6");