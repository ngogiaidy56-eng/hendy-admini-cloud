/**
 * ==========================================================
 * File: main.kt
 * Dự án: hendy-test-project
 * Tự động sinh bởi Hendy Cloudflare Edge
 * ==========================================================
 */

package com.hendystudio.test

fun main(args: Array<String>) {
    println("==================================================")
    println("  HENDY STUDIO KOTLIN RUNTIME INITIALIZED         ")
    println("==================================================")
    
    val projectName = "hendy-test-project"
    printSystemInfo(projectName)
}

fun printSystemInfo(name: String) {
    println("[INFO] Tên dự án hiện tại: $name")
    println("[INFO] Môi trường: Edge Cloud Serverless")
    println("[SUCCESS] Toàn bộ cấu trúc hệ thống đã sẵn sàng!")
}
